
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import CartModal from './CartModal'; 

const Navbar: React.FC = () => {
  const { cartItems } = useCart(); // Extract cart items from the cart context
  const [isCartOpen, setIsCartOpen] = useState(false); 

  // Function to toggle the cart modal open and closed
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg sticky top-0 z-10">
      {/* Application title */}
      <h1 className="text-2xl font-bold hover:scale-105 transition-transform cursor-pointer">
        My E-commerce App
      </h1>
      <div className="relative">
        {/* Button to toggle the cart modal */}
        <button onClick={handleCartToggle} className="flex items-center space-x-2">
          <span className="text-3xl text-yellow-400">🛒</span>
          {/* Conditionally render cart item count if there are items in the cart */}
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {cartItems.length}
            </span>
          )}
        </button>
        {/* Render the CartModal and pass isOpen state and onClose handler */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar; 
