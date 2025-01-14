import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const isSeller = user?.role === "seller";
  const isCustomer = user?.role === "customer"; 
  const { cart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-gray-950">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <nav className="flex items-center space-x-4">
            <Link
              to="/latest"
              className="text-gray-900 font-bold hover:text-gray-400 transition duration-300 ease-in-out"
            >
              LATEST
            </Link>
          </nav>

          <nav className="flex items-center space-x-4 p-2">
            <Link
              to="/kids"
              className="text-gray-900 font-bold hover:text-gray-400 transition duration-300 ease-in-out"
            >
              KIDS
            </Link>
          </nav>

          <nav className="flex items-center space-x-4">
            <Link
              to="/women"
              className="text-gray-900 font-bold hover:text-gray-400 transition duration-300 ease-in-out"
            >
              WOMEN
            </Link>
          </nav>

          <nav className="flex items-center space-x-4 p-2">
            <Link
              to="/men"
              className="text-gray-900 font-bold hover:text-gray-400 transition duration-300 ease-in-out"
            >
              MEN
            </Link>
          </nav>

          <nav className="flex items-center space-x-4 p-1">
            <Link
              to="/"
              className="text-gray-900 font-bold hover:text-gray-400 transition duration-300 ease-in-out"
            >
              HOME
            </Link>
          </nav>

          <div className="flex items-center justify-center flex-1 pl-28">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 items-center space-x-2 flex"
            >
              E-Commerce
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                placeholder="What are you looking for..."
                className="w-60 px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-900 hover:text-gray-500 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-gray-500"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-gray-900 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-gray-900 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            
            {(isSeller || isCustomer) && (
              <Link
                to={"/customer-dashboard"}
                className="text-gray-900 hover:text-gray-400 transition duration-300 ease-in-out"
              >
                My Orders
              </Link>
            )}

            
            {isSeller && (
              <Link
                to={`/seller-dashboard`}
                className="text-gray-900 hover:text-gray-400 transition duration-300 ease-in-out"
              >
                My Store
              </Link>
            )}

            
            {isAdmin && (
              <Link
                className="bg-gray-900 hover:bg-gray-500 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
