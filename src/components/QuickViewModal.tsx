import React from 'react';
import { Product } from '../types/types';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ isOpen, onClose, product, onAddToCart }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-30 transition-opacity duration-300">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 md:mx-8 animate-fadeIn">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200">
          ✖
        </button>

        {/* Product Image */}
        <img src={product.thumbnail} alt={product.title} className="w-full h-64 object-cover rounded-lg shadow-md mb-6" />

        {/* Product Details */}
        <h3 className="text-2xl font-bold text-gray-800">{product.title}</h3>
        <p className="text-lg text-blue-600 font-semibold mt-2">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mt-3 leading-relaxed">{product.description}</p>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
          className="mt-6 w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default QuickViewModal;
