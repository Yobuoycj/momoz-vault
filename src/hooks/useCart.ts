import { useState, useEffect } from 'react';
import { CartItem } from '@/types';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for cart management
 */
export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('momoz_cart', []);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart
  };
};