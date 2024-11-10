import { useState } from 'react';
import { CartItem } from '../types/types';

// Custom hook to manage cart state and operations
const useCart = () => {
  // State to hold all items in the cart, initialized as an empty array
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add a product to the cart or increment the quantity if it already exists
  const addToCart = (product: CartItem['product']) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      // If the product exists, increment its quantity
      setCartItems(cartItems.map(item =>
        item.product.id === product.id
          ? { ...existingItem, quantity: existingItem.quantity + 1 } // Update the quantity
          : item // Return other items unchanged
      ));
    } else {
      // If the product does not exist in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (id: string, quantity: number) => {
    // Update the quantity of the specified product
    setCartItems(cartItems.map(item =>
      item.product.id === id ? { ...item, quantity } : item // Update quantity if IDs match
    ));
  };

  // Function to remove a product from the cart
  const removeFromCart = (id: string) => {
    // Filter out the product by its ID
    setCartItems(cartItems.filter(item => item.product.id !== id));
  };

  // Return the current cart items and functions to modify the cart
  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
};

export default useCart; 
