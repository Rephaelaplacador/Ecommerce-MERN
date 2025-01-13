import React, { useState, useContext, createContext, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../stores/useProductStore";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
    filter: "",
    sort: "lowToHigh",  // Default sort by Price Low to High
    brand: [],
    size: "",
  });

  const value = useMemo(() => [auth, setAuth], [auth, setAuth]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

const SearchPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const [auth, setAuth] = useSearch();
  const { keyword, results, filter, sort, brand, size } = auth;

  const [loading, setLoading] = useState(false);

  const fetchProductsFromCategory = async (category) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/products?category=${category}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched products:", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (filter) {
      fetchProductsFromCategory(filter); 
    }
  }, [filter]);

  const handleFilterChange = (e) => {
    setAuth({ ...auth, filter: e.target.value });
  };

  const handleSortChange = (e) => {
    setAuth({ ...auth, sort: e.target.value });
  };

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setAuth((prevState) => {
      const updatedBrands = prevState.brand.includes(selectedBrand)
        ? prevState.brand.filter((brand) => brand !== selectedBrand)
        : [...prevState.brand, selectedBrand];
      return { ...prevState, brand: updatedBrands };
    });
  };

  const handleSizeChange = (e) => {
    setAuth({ ...auth, size: e.target.value });
  };

  const handleSearchChange = (e) => {
    setAuth({ ...auth, keyword: e.target.value });
  };

  const filteredResults = useMemo(() => {
    return products
      .filter((product) => {
        const isKeywordMatch = product.name.toLowerCase().includes(keyword.toLowerCase());
        const isCategoryMatch = filter ? product.category === filter : true;
        const isBrandMatch = brand.length ? brand.includes(product.brand) : true;
        const isSizeMatch = size ? product.size === size : true;
        return isKeywordMatch && isCategoryMatch && isBrandMatch && isSizeMatch;
      })
      .sort((a, b) => {
        switch (sort) {
          case "lowToHigh":
            return a.price - b.price; // Sort by price Low to High
          case "highToLow":
            return b.price - a.price; // Sort by price High to Low
          case "latest":
            return new Date(b.createdAt) - new Date(a.createdAt); // Sort by latest
          case "featured":
            return b.featured ? 1 : -1; // Sort by featured
          default:
            return 0;
        }
      });
  }, [products, keyword, filter, sort, brand, size]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-gray-100 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Search Results
        </motion.h1>

        <div className="flex">
          <div className="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="search" className="block text-sm text-gray-300 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name..."
                  value={keyword}
                  onChange={handleSearchChange}
                  className="w-full p-2 border rounded-lg text-gray-700"
                />
              </div>

              {/* Sort by Price and Other Options */}
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
              {loading ? (
                <div className="text-center">Loading products...</div>
              ) : (
                <>
                  {filteredResults.length === 0 ? (
                    <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
                      No results found
                    </h2>
                  ) : (
                    filteredResults.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
