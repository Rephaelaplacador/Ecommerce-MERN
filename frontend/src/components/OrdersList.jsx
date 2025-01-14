import { useOrderStore } from "../stores/useOrderStore";

const OrdersList = ({ activeCategory }) => {
  const { orders } = useOrderStore();

 
  const filteredOrders =
    activeCategory === "All"
      ? orders
      : orders.filter((order) => order.status === activeCategory);

  
  if (filteredOrders.length === 0) {
    return <p className="text-gray-300 text-center">No orders found.</p>;
  }

  return (
    <ul className="bg-gray-800 rounded-md p-4">
      {filteredOrders.map((order) => (
        <li
          key={order._id}  
          className="flex justify-between items-center mb-4 bg-gray-900 p-4 rounded-md"
        >
          <div>
            <h4 className="text-lg font-semibold text-white">Order #{order._id}</h4> 
            <p className="text-gray-400">Status: {order.status}</p>
          </div>
          <p className="text-gray-300">Total: ₱{order.totalAmount}</p> 
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
