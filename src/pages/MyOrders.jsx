import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabase/client';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const userEmail = location.state?.email || '';

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) {
        setError('Please provide your email to view orders');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('email', userEmail)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [userEmail]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-900 text-yellow-300',
      processing: 'bg-blue-900 text-blue-300',
      shipped: 'bg-purple-900 text-purple-300',
      delivered: 'bg-green-900 text-green-300',
      cancelled: 'bg-red-900 text-red-300'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status] || 'bg-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-serif text-gold mb-6">My Orders</h1>
      
      {!userEmail ? (
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold mb-2">Order History Protected</h2>
          <p className="text-gray-400 mb-6">
            Please provide your email address to view your order history.
            We'll send you a secure link to access your orders.
          </p>
          
          <div className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-3 rounded bg-gray-800 text-white mb-4"
            />
            <button className="w-full bg-pink-600 hover:bg-pink-700 py-3 rounded text-white">
              View My Orders
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <p className="text-gray-400">
              Showing orders for: <span className="text-pink-300">{userEmail}</span>
            </p>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-4 animate-pulse">
                  <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-900 text-red-200 p-6 rounded-lg">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-xl font-bold mb-2">No Orders Found</h2>
              <p className="text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your order history here.
              </p>
              <a 
                href="/products" 
                className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white inline-block"
              >
                Browse Products
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <div>
                      <div className="font-bold text-lg mb-1">Order #{order.id.slice(0, 8)}</div>
                      <div className="text-sm text-gray-400">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-gray-400 text-sm">Total Amount</div>
                      <div className="font-bold text-gold">UGX {order.amount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Payment Method</div>
                      <div className="font-bold capitalize">{order.payment_method}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Delivery Address</div>
                      <div className="font-bold">{order.address}</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <h3 className="font-bold mb-2">Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-400 ml-2">x {item.quantity}</span>
                          </div>
                          <div>
                            <span>UGX {(item.price_ugx * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;