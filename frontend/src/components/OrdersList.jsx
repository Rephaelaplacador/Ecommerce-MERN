import { useEffect, useState } from "react";
import { useOrderStore } from "../stores/useOrderStore";

const OrdersList = () => {
  const { orders, fetchCustomerOrders } = useOrderStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      await fetchCustomerOrders();
      setLoading(false);
    };
    getOrders();
  }, [fetchCustomerOrders]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div>You have no orders yet.</div>;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded-md bg-gray-800">
          <h2 className="text-xl text-gray-100">Order #{order.id}</h2>
          <p className="text-gray-400">Date: {new Date(order.date).toLocaleDateString()}</p>
          <p className="text-gray-400">Status: {order.status}</p>
          <div className="mt-2">
            <h3 className="font-semibold text-gray-300">Items:</h3>
            <ul className="list-disc pl-5">
              {order.items.map((item) => (
                <li key={item.productId} className="text-gray-400">
                  {item.name} - {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
