import React from 'react';
import { Product } from '../types/types';

// Defining the props interface for the ProductCard component
interface ProductCardProps {
  product: Product; // The product object containing product details
  onQuickView: () => void; // Callback function for quick view action
  onAddToCart: (product: Product) => void; // Callback function to add the product to the cart
}

// ProductCard component definition
const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onAddToCart }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
      {/* Product image */}
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        {/* Product title */}
        <h3 className="text-lg font-semibold">{product.title}</h3>
        {/* Product price */}
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center mt-4">
          {/* Button to add the product to the cart */}
          <button
            onClick={() => onAddToCart(product)} // Calls the onAddToCart function with the product as an argument
            className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors"
          >
            Add to Cart
          </button>
          {/* Button for quick view action */}
          <button onClick={onQuickView} className="text-blue-600 hover:underline">
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
