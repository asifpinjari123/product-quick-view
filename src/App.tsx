import React from 'react';
import { CartProvider } from './context/CartContext'; 
import Navbar from './components/Navbar'; 
import Home from '../src/pages/Home'; 

const App: React.FC = () => {
  return (
    // Wrap the application in CartProvider to provide cart context to all components
    <CartProvider>
      <Navbar /> 
      <Home />    
    </CartProvider>
  );
};

export default App; 
