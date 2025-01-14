import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { Edit, Trash2, Loader } from "lucide-react"; // For icons

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [sales, setSales] = useState(null);
    const [orders, setOrders] = useState({}); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", role: "User" });

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/users/all");
            setUsers(response.data);
            setIsLoading(false);
            setError(null); 

            response.data.forEach(user => {
                fetchUserOrders(user._id); 
            });
        } catch (err) {
            console.error("Error fetching users:", err.message);
            setError("Failed to fetch users.");
            setIsLoading(false);
        }
    };

    const fetchUserOrders = async (userId) => {
        try {
            const response = await axios.get(`/orders/${userId}`);
            console.log(`Fetched orders for user ${userId}:`, response.data); 

            setOrders((prevOrders) => ({
                ...prevOrders,
                [userId]: response.data,
            }));
        } catch (err) {
            console.error(`Error fetching orders for user ${userId}:`, err.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchUserAnalytics(currentUser._id);
            fetchUserSales(currentUser._id);
            fetchUserOrders(currentUser._id);
        }
    }, [currentUser]);

    const handleEdit = (user) => {
        setCurrentUser(user);
        setForm(user);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
                "$1"
            ); 

            await axios.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center">User Management</h2>

            {error && (
                <p className="bg-red-500 text-white text-sm p-3 rounded mb-4">{error}</p>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <Loader className="animate-spin text-white text-4xl" />
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {users.length === 0 ? (
                            <p className="text-sm text-gray-400">No users found.</p>
                        ) : (
                            users.map((user) => (
                                <div
                                    key={user._id}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="font-bold text-lg">{user.name}</p>
                                            <p className="text-sm text-gray-400">{user.email}</p>
                                            <p className="text-sm text-gray-500">{user.role}</p>
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                                            >
                                                <Edit className="mr-2" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
                                            >
                                                <Trash2 className="mr-2" /> Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-200 mb-2">Platform Activities</h4>
                                        <pre className="text-sm bg-gray-700 p-4 rounded">{JSON.stringify(analytics?.[user._id] || {}, null, 2)}</pre>
                                    </div>

                                    {user.role === "admin" && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-gray-200 mb-2">Sales Reports</h4>
                                            <pre className="text-sm bg-gray-700 p-4 rounded">{JSON.stringify(sales?.[user._id] || {}, null, 2)}</pre>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-200 mb-2">Orders</h4>
                                        <div className="space-y-4">
                                            {orders[user._id] ? (
                                                orders[user._id].map((order) => (
                                                    <div
                                                        key={order._id}
                                                        className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                                    >
                                                        <p className="font-semibold text-gray-100">Order ID: {order._id}</p>
                                                        <p className="text-sm text-gray-400">Total Amount: {order.totalAmount}</p>
                                                        <p className="text-sm text-gray-400">Status: {order.status}</p>
                                                        <p className="text-sm text-gray-400">
                                                            Created At: {new Date(order.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-400">No orders available.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
