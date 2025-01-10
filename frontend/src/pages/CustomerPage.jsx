import { ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import OrdersList from "../components/OrdersList";  
import ProfileForm from "../components/ProfileForm";  
import { useOrderStore } from "../stores/useOrderStore";

const tabs = [
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "profile", label: "Profile", icon: User },
];

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { fetchCustomerOrders } = useOrderStore();

  useEffect(() => {
    fetchCustomerOrders();
  }, [fetchCustomerOrders]);

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='relative z-10 container mx-auto px-4 py-16'>
        <motion.h1
          className='text-4xl font-bold mb-8 text-gray-100 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Customer Dashboard
        </motion.h1>

        <div className='flex justify-center mb-8'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-gray-950 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-950"
              }`}
            >
              <tab.icon className='mr-2 h-5 w-5' />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "orders" && <OrdersList />} {/* Component to display customer orders */}
        {activeTab === "profile" && <ProfileForm />} {/* Component to update customer profile */}
      </div>
    </div>
  );
};

export default CustomerPage;
