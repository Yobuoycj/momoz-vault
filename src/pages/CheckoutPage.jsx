import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalUGX = cart.reduce((sum, item) => sum + item.price_ugx * item.quantity, 0);
  const totalKES = cart.reduce((sum, item) => sum + item.price_kes * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center">
        <div className="text-6xl mb-6">💨</div>
        <h1 className="text-2xl font-serif text-pink-500 mb-4">Your cart is empty</h1>
        <Link to="/products" className="underline text-pink-300">Browse our perfume collection</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-8">
      <h1 className="text-3xl font-serif text-gold mb-6 text-center">Review Your Order</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left pb-3">Product</th>
                  <th className="text-right pb-3">Price</th>
                  <th className="text-center pb-3">Qty</th>
                  <th className="text-right pb-3">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image_url || 'https://via.placeholder.com/60'} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-pink-300">{item.name}</h3>
                          <p className="text-sm text-gray-400">{item.scent_notes}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4">
                      <div>UGX {item.price_ugx.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">KES {item.price_kes.toLocaleString()}</div>
                    </td>
                    <td className="text-center py-4">{item.quantity}</td>
                    <td className="text-right py-4 text-gold">UGX {(item.price_ugx * item.quantity).toLocaleString()}</td>
                    <td className="text-right py-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-serif text-gold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span>UGX {totalUGX.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping:</span>
                <span>UGX 10,000</span>
              </div>
              
              <div className="flex justify-between border-t border-gray-700 pt-3 mt-3">
                <span className="font-bold">Total:</span>
                <span className="text-xl font-bold text-gold">UGX {(totalUGX + 10000).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-serif text-gold mb-4">Next Steps</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-gold mt-1">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Free Shipping</h3>
                  <p className="text-sm text-gray-400">All orders ship free across East Africa</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-gold mt-1">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-400">Your payment information is encrypted</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-gold mt-1">
                  <i className="fas fa-gift"></i>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Free Samples</h3>
                  <p className="text-sm text-gray-400">Every order includes free fragrance samples</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={clearCart}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white"
          >
            Clear Cart
          </button>
          
          <Link to="/products" className="flex-1">
            <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white">
              Continue Shopping
            </button>
          </Link>
          
          <Link to="/checkout" className="flex-1">
            <button className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-bold">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;