import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/types';

// Define the structure for items in the cart, including the product details and quantity
interface CartItem {
  product: Product;
  quantity: number;
}

// Define the CartContext type with the necessary functions to manage cart items
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

// Create a context with CartContextType and initialize as undefined to handle safe usage later
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to manage cart state and provide it to other components
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold all items in the cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to add a product to the cart or update the quantity if it already exists
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      // Check if the product is already in the cart
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        // Update the quantity if the item is already in the cart
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add the new product with a quantity of 1 if it’s not in the cart
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  // Function to update the quantity of a product in the cart, and remove it if quantity is zero
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.product.id === id ? { ...item, quantity } : item // Update quantity if IDs match
        )
        .filter(item => item.quantity > 0) // Remove items with a quantity of 0
    );
  };

  // Function to completely remove a product from the cart
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  // Provide the cart items and management functions to children components
  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context in any component
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider'); // Ensures use within CartProvider
  }
  return context;
};
