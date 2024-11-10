import React from 'react';
import { useCart } from '../context/CartContext';

// Define the props for the CartModal component
const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  // Extract cart items and functions from the Cart context
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // If the modal is not open, return null to avoid rendering it
  if (!isOpen) return null;

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full transform transition-all sm:max-w-xl md:max-w-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-600">Your Cart</h2>
        {cartItems.length === 0 ? (
          // Display a message if the cart is empty
          <p className="text-center text-gray-700 text-lg font-semibold">Your cart is empty.</p>
        ) : (
          <>
            {/* Render list of cart items */}
            <ul className="mb-6 space-y-4">
              {cartItems.map(item => (
                <li key={item.product.id} className="flex items-center justify-between border-b pb-4">
                  {/* Display product thumbnail */}
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-lg shadow-md mr-4"
                  />
                  <div className="flex-grow">
                    {/* Display product title and price */}
                    <h3 className="text-xl font-semibold text-gray-800">{item.product.title}</h3>
                    <p className="text-gray-600 mt-1">Price: ${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Button to decrease item quantity */}
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 text-white bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                      -
                    </button>
                    {/* Display current quantity of the item */}
                    <span className="font-semibold text-lg text-red-500">{item.quantity}</span>
                    {/* Button to increase item quantity */}
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 text-white bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition"
                    >
                      +
                    </button>
                  </div>
                  {/* Display the total price for this item (quantity x price) */}
                  <span className="text-gray-800 font-semibold text-lg ml-4">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  {/* Button to remove the item from the cart */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 ml-4 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            {/* Display the total price of all items in the cart */}
            <div className="flex justify-between items-center font-bold text-2xl text-gray-800 border-t pt-4">
              <span>Total:</span>
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
          </>
        )}
        {/* Button to close the modal */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal; 
