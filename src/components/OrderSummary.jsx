import React from 'react';
import { useCart } from '../context/CartContext';

const OrderSummary = () => {
  const { cart } = useCart();

  const totalUGX = cart.reduce((sum, item) => sum + item.price_ugx * item.quantity, 0);
  const totalKES = cart.reduce((sum, item) => sum + item.price_kes * item.quantity, 0);

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gold mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-400 ml-2">x {item.quantity}</span>
            </div>
            <div>
              <span className="font-medium">UGX {(item.price_ugx * item.quantity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>UGX {totalUGX.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>UGX 10,000</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-700">
          <span>Total:</span>
          <span>UGX {(totalUGX + 10000).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;