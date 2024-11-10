// src/hooks/useCart.ts

import { useState } from 'react'; // Importing the useState hook from React
import { Product } from '../types/types'; // Importing the Product type for type safety

// Interface to define the structure of a cart item
interface CartItem {
  product: Product; // The product associated with the cart item
  quantity: number; // The quantity of this product in the cart
}

// Custom hook to manage the shopping cart
const useCart = () => {
  // State to hold all items in the cart, initialized as an empty array of CartItem type
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add a product to the cart or increment its quantity if it already exists
  const addToCart = (product: Product) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      // If the item is already in the cart, increase its quantity
      setCartItems(cartItems.map(item =>
        item.product.id === product.id
          ? { ...existingItem, quantity: existingItem.quantity + 1 } // Increment quantity
          : item // Keep the other items unchanged
      ));
    } else {
      // If the product is not in the cart, add it with an initial quantity of 1
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  // Function to update the quantity of a specific product in the cart
  const updateQuantity = (id: string, quantity: number) => {
    // Update the quantity for the product matching the given ID
    setCartItems(cartItems.map(item =>
      item.product.id === id ? { ...item, quantity } : item // Update if ID matches
    ));
  };

  // Function to remove a product from the cart by its ID
  const removeFromCart = (id: string) => {
    // Filter out the product that matches the given ID
    setCartItems(cartItems.filter(item => item.product.id !== id));
  };

  // Return the current cart items and functions to modify the cart
  return {
    cartItems, // Current items in the cart
    addToCart, // Function to add an item to the cart
    updateQuantity, // Function to update the quantity of an item
    removeFromCart, // Function to remove an item from the cart
  };
};

export default useCart; // Export the useCart hook for use in other components
