import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { Product } from '../types/types';
import { fetchProducts } from '../utils/api';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  // Destructure addToCart from the useCart hook to manage cart operations
  const { addToCart } = useCart();

  // State to hold the list of products fetched from the API
  const [products, setProducts] = useState<Product[]>([]);
  // State to hold the currently selected product for quick view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // State to manage the visibility of the quick view modal
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // useEffect to load products from the API when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.products);
    };
    loadProducts();
  }, []);

  // Function to handle opening the quick view modal for a specific product
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // This function adds the selected product to the cart
  const handleAddToCart = (product: Product) => {
    addToCart(product); // Call the addToCart function from the context
  };

  return (
    <div className="p-4"> {/* Main container with padding */}
      <h1 className="text-3xl font-bold mb-4">Welcome to My E-commerce App</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id} // Unique key for each product
            product={product} // Pass the product data to ProductCard
            onQuickView={() => handleQuickView(product)} // Handler for quick view button
            onAddToCart={() => handleAddToCart(product)} // Handler for add to cart button
          />
        ))}
      </div>
      {/* Quick view modal that shows product details */}
      <QuickViewModal
        isOpen={isQuickViewOpen} // Modal open state
        onClose={() => setIsQuickViewOpen(false)} // Handler to close the modal
        product={selectedProduct} // Pass the selected product to the modal
        onAddToCart={handleAddToCart} // Pass the add to cart function to the modal
      />
    </div>
  );
};

export default Home; 
