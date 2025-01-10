import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();
	const { category } = useParams();

	
	const [selectedFilter, setSelectedFilter] = useState(""); 
	const [sortOrder, setSortOrder] = useState(""); 
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	useEffect(() => {
		let updatedProducts = [...products]; 
	  
		
		if (selectedFilter) {
		  updatedProducts = updatedProducts.filter((product) => product.type === selectedFilter);
		}
	  
		
		switch (sortOrder) {
		  case "low-to-high":
			updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
			break;
		  case "high-to-low":
			updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
			break;
		  case "latest":
			updatedProducts = updatedProducts.sort(
			  (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt) 
			);
			break;
		  case "featured":
			updatedProducts = updatedProducts.filter((product) => product.isFeatured);
			break;
		  default:
			break;
		}
	  
		setFilteredProducts(updatedProducts); 
	  }, [selectedFilter, sortOrder, products]);
	  

	const handleFilterChange = (e) => {
		setSelectedFilter(e.target.value);
	};

	const handleSortChange = (e) => {
		setSortOrder(e.target.value);
	};

	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-gray-100 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				
				<div className='flex justify-end mb-6'>

					
					<select
						className='p-2 border rounded-lg text-gray-700'
						value={sortOrder}
						onChange={handleSortChange}
					>
						<option value="">Sort by</option>
						<option value="low-to-high">Price: Low to High</option>
						<option value="high-to-low">Price: High to Low</option>
						<option value="latest">Latest</option>
						<option value="featured">Featured</option>
					</select>
				</div>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{filteredProducts.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							No products found
						</h2>
					)}

					{filteredProducts.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default CategoryPage;
