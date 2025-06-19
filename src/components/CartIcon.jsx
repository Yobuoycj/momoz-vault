import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <Link to="/cart" className="relative text-gold">
      <i className="fas fa-shopping-cart text-xl"></i>
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cart.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;