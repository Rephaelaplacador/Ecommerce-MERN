import { useEffect, useState } from "react";
import { useOrderStore } from "../stores/useOrderStore";

const OrdersList = () => {
  const { orders, fetchCustomerOrders } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      await fetchCustomerOrders();
      setLoading(false);
    };
    getOrders();
  }, [fetchCustomerOrders]);

  const handleItemSelect = (orderId, productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [productId]: !prev[orderId]?.[productId],
      },
    }));
  };

  const handlePurchase = () => {
    const itemsToPurchase = Object.entries(selectedItems).flatMap(
      ([orderId, products]) =>
        Object.entries(products)
          .filter(([, isSelected]) => isSelected)
          .map(([productId]) => {
            const order = orders.find((o) => o.id === parseInt(orderId));
            const item = order.items.find((i) => i.productId === parseInt(productId));
            return { orderId, ...item };
          })
    );

    if (itemsToPurchase.length === 0) {
      alert("Please select at least one item to purchase.");
      return;
    }

    console.log("Items to purchase:", itemsToPurchase);

    alert(`You have purchased ${itemsToPurchase.length} item(s).`);
  };

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
                <li
                  key={item.productId}
                  className="text-gray-400 flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-500"
                    checked={selectedItems[order.id]?.[item.productId] || false}
                    onChange={() => handleItemSelect(order.id, item.productId)}
                  />
                  <span>
                    {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handlePurchase}
      >
        Purchase Selected Items
      </button>
    </div>
  );
};

export default OrdersList;
