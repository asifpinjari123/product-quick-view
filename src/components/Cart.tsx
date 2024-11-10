import React from 'react';

// Define the structure of a cart item, which includes product details and quantity
interface CartItem {
  product: {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
  };
  quantity: number;
}

// Define the props for the Cart component
interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

// Cart component definition
const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove }) => {
  // Calculate the total price of all items in the cart
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        // Display a message if the cart is empty
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          {/* Map through the items array to display each cart item */}
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center">
                {/* Display product thumbnail */}
                <img src={item.product.thumbnail} alt={item.product.title} className="w-16 h-16 object-cover mr-4 rounded" />
                <div>
                  {/* Display product title, price, and quantity */}
                  <h4 className="font-semibold text-gray-800">{item.product.title}</h4>
                  <p className="text-gray-500">${item.product.price.toFixed(2)} each</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center">
                {/* Button to increase the quantity */}
                <button
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  +
                </button>
                {/* Button to decrease the quantity, ensuring it doesn't go below 1 */}
                <button
                  onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 bg-blue-500 text-white rounded ml-2 hover:bg-blue-600 transition"
                >
                  -
                </button>
                {/* Button to remove the item from the cart */}
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="ml-2 text-red-600 hover:text-red-800 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* Display the total price of items in the cart */}
          <h3 className="font-bold mt-2 text-lg">Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart; 
