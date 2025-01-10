import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-gray-100 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-100 mb-12">
          Discover the latest trends in Eco-Friendly Fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo and Store Information */}
            <div>
              <h3 className="text-3xl font-bold text-gray-100 mb-4">Eco-Fashion</h3>
              <p className="text-lg text-gray-400 mb-2">
                Your one-stop shop for sustainable and stylish clothing. We offer a curated selection of eco-friendly products that don't compromise on quality or style.
              </p>
              <p className="text-gray-500 text-sm">© 2025 Eco-Fashion. All rights reserved.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold text-gray-300 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-gray-400">Terms of Service</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-xl font-semibold text-gray-300 mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
                <li><a href="/returns" className="hover:text-gray-400">Returns & Exchanges</a></li>
                <li><a href="/shipping" className="hover:text-gray-400">Shipping Information</a></li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold text-gray-300 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-gray-500">
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-gray-500">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-gray-500">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a href="https://pinterest.com" target="_blank" className="text-gray-400 hover:text-gray-500">
                  <FontAwesomeIcon icon={faPinterest} size="lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
