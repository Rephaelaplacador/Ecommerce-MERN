import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("lowToHigh");

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredResults = products
    ? products
        .filter((product) => {
          if (filter && product.category !== filter) return false;
          return true;
        })
        .sort((a, b) => {
          switch (sort) {
            case "lowToHigh":
              return a.price - b.price;
            case "highToLow":
              return b.price - a.price;
            case "latest":
              return new Date(b.createdAt) - new Date(a.createdAt);
            case "featured":
              return b.featured ? 1 : -1;
            default:
              return 0;
          }
        })
    : [];

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-gray-100 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <div className="flex">
          
          <div className="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              
              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-2">Filter by Category</label>
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-lg text-gray-700"
                >
                  <option value="">All Categories</option>
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  
                </select>
              </div>

              
              <div className="mb-4">
                <label htmlFor="sort" className="block text-sm text-gray-300 mb-2">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={handleSortChange}
                  className="w-full p-2 border rounded-lg text-gray-700"
                >
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="latest">Latest</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>
          </div>

          
          <div className="w-full lg:w-3/4 px-4">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {filteredResults.length === 0 ? (
                <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                  No products found
                </h2>
              ) : (
                filteredResults.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
