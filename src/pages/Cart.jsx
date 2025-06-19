import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    setUpdating(id);
    setTimeout(() => {
      updateQuantity(id, newQuantity);
      setUpdating(null);
    }, 300);
  };

  const getTotal = (currency) => {
    return cart.reduce((sum, item) => {
      const price = currency === 'UGX' ? item.price_ugx : item.price_kes;
      return sum + price * item.quantity;
    }, 0);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        <div className="text-5xl mb-6">🛒</div>
        <h1 className="text-2xl font-serif text-pink-500 mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet</p>
        <Link 
          to="/products" 
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full text-white"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-serif text-gold mb-8">Your Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="hidden md:grid grid-cols-12 gap-4 text-gray-400 text-sm mb-4 px-4">
              <div className="col-span-5">Product</div>
              <div className="col-span-3">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Total</div>
            </div>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-800"
                >
                  <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/80'} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-pink-300">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.scent_notes}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-3 text-gray-300">
                    <div>UGX {item.price_ugx.toLocaleString()}</div>
                    <div className="text-sm">KES {item.price_kes.toLocaleString()}</div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-2">
                    <div className="flex items-center border border-gray-700 rounded w-24">
                      <button 
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-gray-400 hover:text-white"
                        disabled={updating === item.id}
                      >
                        -
                      </button>
                      <div className="flex-1 text-center px-2 py-1">
                        {updating === item.id ? (
                          <i className="fas fa-spinner fa-spin text-gold"></i>
                        ) : (
                          item.quantity
                        )}
                      </div>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-400 hover:text-white"
                        disabled={updating === item.id}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 text-gold font-medium">
                    UGX {(item.price_ugx * item.quantity).toLocaleString()}
                  </div>
                  
                  <div className="col-span-12 md:col-span-1 flex justify-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={clearCart}
                className="text-gray-400 hover:text-red-500 flex items-center gap-2"
              >
                <i className="fas fa-trash"></i> Clear Cart
              </button>
              <Link 
                to="/products" 
                className="text-pink-400 hover:text-pink-300 flex items-center gap-2"
              >
                <i className="fas fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-serif text-gold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span>UGX {getTotal('UGX').toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping:</span>
                <span>UGX 10,000</span>
              </div>
              
              <div className="flex justify-between border-t border-gray-700 pt-4 mt-4">
                <span className="font-bold">Total:</span>
                <span className="text-xl font-bold text-gold">UGX {(getTotal('UGX') + 10000).toLocaleString()}</span>
              </div>
            </div>
            
            <button
              onClick={proceedToCheckout}
              className="w-full mt-8 bg-pink-600 hover:bg-pink-700 py-3 rounded-full text-white font-bold"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-6 text-sm text-gray-400">
              <p className="flex items-start gap-2 mb-2">
                <i className="fas fa-lock mt-1 text-gold"></i>
                <span>Secure SSL encryption & privacy protection</span>
              </p>
              <p className="flex items-start gap-2">
                <i className="fas fa-undo mt-1 text-gold"></i>
                <span>30-day money back guarantee</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;