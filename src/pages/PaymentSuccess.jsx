import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (!order) {
      navigate('/');
      return;
    }
    
    const fetchOrderDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', order.id)
          .single();
        
        if (error) throw error;
        
        setOrderDetails(data);
      } catch (err) {
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [order, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-5xl mb-6 animate-spin">🔄</div>
        <p>Verifying your payment...</p>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-400 mb-6 text-center">
          We couldn't retrieve your order details. Please contact support for assistance.
        </p>
        <a 
          href="/contact" 
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white"
        >
          Contact Support
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="text-center py-12">
          <div className="text-6xl text-green-500 mb-6">🎉</div>
          <h1 className="text-3xl md:text-4xl font-serif text-gold mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-pink-300 mb-8">
            Your payment was successful and your order is being processed.
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-serif text-gold mb-6 text-center">Order Summary</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Number:</span>
                  <span>#{orderDetails.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Date:</span>
                  <span>
                    {new Date(orderDetails.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Amount:</span>
                  <span className="text-gold font-bold">UGX {orderDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="capitalize">{orderDetails.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                    {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400">Customer:</div>
                  <div className="font-bold">{orderDetails.customer_name}</div>
                </div>
                <div>
                  <div className="text-gray-400">Email:</div>
                  <div className="font-bold">{orderDetails.email}</div>
                </div>
                <div>
                  <div className="text-gray-400">Phone:</div>
                  <div className="font-bold">{orderDetails.phone}</div>
                </div>
                <div>
                  <div className="text-gray-400">Address:</div>
                  <div className="font-bold">{orderDetails.address}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderDetails.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border-b border-gray-800">
                  <img 
                    src={item.image_url || 'https://via.placeholder.com/60'} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-pink-300">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.scent_notes}</div>
                  </div>
                  <div className="text-right">
                    <div>UGX {item.price_ugx.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            We've sent a confirmation email to {orderDetails.email}. 
            You'll receive another email when your order ships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white"
            >
              Continue Shopping
            </a>
            <a 
              href="/my-orders" 
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded text-white"
            >
              View Order History
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;