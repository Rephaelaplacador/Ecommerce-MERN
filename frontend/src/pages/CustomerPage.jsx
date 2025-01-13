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

const orderTabs = [
  "All",
  "To Pay",
  "To Ship",
  "To Receive",
  "Completed",
  "Cancelled",
  "Return Refund",
];

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [activeOrderTab, setActiveOrderTab] = useState("All");
  const { fetchCustomerOrders, loading } = useOrderStore();

  useEffect(() => {
    fetchCustomerOrders();
  }, [fetchCustomerOrders]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-gray-100 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Customer Dashboard
        </motion.h1>

        {/* Tabs for Orders and Profile */}
        <div className="flex justify-center mb-8">
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
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "orders" && (
          <div>
            {/* Order Tracking with Categories */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-center text-gray-100">Track Your Orders</h3>
              <p className="text-gray-300 mb-6 text-center">
                Filter your orders by status and track their progress in real-time.
              </p>

              {/* Order Categories Tabs */}
              <div className="flex justify-center mb-6 border-b border-gray-700">
                {orderTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveOrderTab(tab)}
                    className={`px-4 py-2 mx-2 border-b-2 ${
                      activeOrderTab === tab
                        ? "border-gray-500 text-gray-500 font-semibold"
                        : "border-transparent text-gray-300 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Order List */}
              {loading ? (
                <p className="text-gray-300 text-center">Loading your orders...</p>
              ) : (
                <OrdersList activeCategory={activeOrderTab} />
              )}
            </div>
          </div>
        )}

        {activeTab === "profile" && <ProfileForm />}
      </div>
    </div>
  );
};

export default CustomerPage;
