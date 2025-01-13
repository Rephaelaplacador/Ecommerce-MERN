import { useState, useEffect } from "react";
import axios from "../lib/axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", role: "User" });

    
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("/users"); 
            setUsers(response.data);
            setIsLoading(false);
        } catch (err) {
            setError("Failed to fetch users.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    
    const handleSave = async () => {
        try {
            if (isEditing) {
                await axios.put(`/users/${currentUser.id}`, form); 
                setUsers((prev) =>
                    prev.map((user) => (user.id === currentUser.id ? { ...form, id: user.id } : user))
                );
                setIsEditing(false);
            } else {
                const response = await axios.post("/users", form); 
                setUsers((prev) => [...prev, response.data]);
            }
            setForm({ name: "", email: "", role: "User" });
        } catch (err) {
            setError("Failed to save user.");
        }
    };

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/users/${id}`); 
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    
    const handleEdit = (user) => {
        setCurrentUser(user);
        setForm(user);
        setIsEditing(true);
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-gray-100">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Loading Indicator */}
            {isLoading ? (
                <p>Loading users...</p>
            ) : (
                <div>
                    {/* User List */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-2">Users</h3>
                        <ul className="divide-y divide-gray-700">
                            {users.map((user) => (
                                <li key={user.id} className="flex justify-between items-center py-2">
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-sm text-gray-400">{user.email}</p>
                                        <p className="text-sm text-gray-500">{user.role}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="px-2 py-1 text-sm text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="ml-2 px-2 py-1 text-sm text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Form */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            {isEditing ? "Edit User" : "Add New User"}
                        </h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-900 text-gray-100 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-900 text-gray-100 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <select
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-900 text-gray-100 rounded-md"
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                {isEditing ? "Update User" : "Add User"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
