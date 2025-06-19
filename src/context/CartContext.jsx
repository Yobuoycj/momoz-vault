import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('momoz_cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('momoz_cart', JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, {...product, quantity: 1}];
      setCart(newCart);
      localStorage.setItem('momoz_cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('momoz_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('momoz_cart');
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item => 
      item.id === id ? {...item, quantity} : item
    );
    setCart(updatedCart);
    localStorage.setItem('momoz_cart', JSON.stringify(updatedCart));
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}