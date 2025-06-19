import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabase/client';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '',
    city: '',
    country: 'Uganda',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('mobile_money');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalUGX = cart.reduce((sum, item) => sum + item.price_ugx * item.quantity, 0) + 10000;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!/^\+256\d{9}$/.test(form.phone)) {
      setError('Phone must be in the format +256XXXXXXXXX');
      return false;
    }
    
    if (!form.address.trim()) {
      setError('Please enter your delivery address');
      return false;
    }
    
    if (!form.city.trim()) {
      setError('Please enter your city');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Save order to Supabase
      const { data, error: supabaseError } = await supabase
        .from('orders')
        .insert([{
          customer_name: form.name,
          email: form.email,
          phone: form.phone,
          address: `${form.address}, ${form.city}, ${form.country}`,
          notes: form.notes,
          amount: totalUGX,
          items: cart,
          status: 'pending',
          payment_method: paymentMethod
        }]);
      
      if (supabaseError) throw supabaseError;
      
      // Clear cart
      clearCart();
      
      // Redirect to payment page
      navigate('/payment');
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to process your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-serif text-gold mb-6">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-serif text-gold mb-4">Delivery Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-900 text-red-200 p-3 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+256XXXXXXXXX"
                    className="w-full p-3 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-1">Delivery Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-3 rounded bg-gray-800 text-white"
                  required
                ></textarea>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-800 text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-1">Country</label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-800 text-white"
                  >
                    <option value="Uganda">Uganda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-1">Order Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Special instructions, delivery preferences, etc."
                  className="w-full p-3 rounded bg-gray-800 text-white"
                ></textarea>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-serif text-gold mb-4">Payment Method</h2>
                
                <div className="space-y-3">
                  {[
                    { id: 'mobile_money', label: 'Mobile Money (UGX)', icon: 'fas fa-mobile-alt' },
                    { id: 'credit_card', label: 'Credit/Debit Card', icon: 'fas fa-credit-card' },
                    { id: 'cash_on_delivery', label: 'Cash on Delivery', icon: 'fas fa-money-bill-wave' }
                  ].map((method) => (
                    <div key={method.id} className="flex items-center">
                      <input
                        type="radio"
                        id={method.id}
                        name="paymentMethod"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="mr-3"
                      />
                      <label htmlFor={method.id} className="flex items-center gap-2">
                        <i className={`${method.icon} text-gold`}></i>
                        {method.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-pink-600 hover:bg-pink-700 py-3 rounded-full text-white font-bold disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-900 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-serif text-gold mb-4">Your Order</h2>
            
            <div className="border-b border-gray-700 pb-4 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/40'} 
                      alt={item.name} 
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-pink-300">{item.name}</h3>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-gold">UGX {(item.price_ugx * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>UGX {totalUGX - 10000}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>UGX 10,000</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-700">
                <span>Total:</span>
                <span className="text-gold">UGX {totalUGX.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-serif text-gold mb-4">Delivery Information</h2>
            
            <div className="space-y-2 text-gray-300">
              <p>We deliver across East Africa within 2-5 business days.</p>
              <p>Shipping cost is a flat rate of UGX 10,000 for all locations.</p>
              <p>For international orders, please contact us directly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;