import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [statusFilter]);

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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
      
      if (error) throw error;
      
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Failed to update order status. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-serif text-gold mb-8">Manage Orders</h1>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded ${statusFilter === 'all' ? 'bg-pink-600' : 'bg-gray-800'}`}
          >
            All Orders
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded ${statusFilter === 'pending' ? 'bg-yellow-600' : 'bg-gray-800'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-4 py-2 rounded ${statusFilter === 'processing' ? 'bg-blue-600' : 'bg-gray-800'}`}
          >
            Processing
          </button>
          <button
            onClick={() => setStatusFilter('shipped')}
            className={`px-4 py-2 rounded ${statusFilter === 'shipped' ? 'bg-purple-600' : 'bg-gray-800'}`}
          >
            Shipped
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-4 py-2 rounded ${statusFilter === 'delivered' ? 'bg-green-600' : 'bg-gray-800'}`}
          >
            Delivered
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-900 p-4 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-xl font-bold mb-2">No Orders Found</h2>
          <p className="text-gray-400">
            {statusFilter === 'all' 
              ? 'You have no orders yet.' 
              : `You have no orders with status: ${statusFilter}`}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="p-3">#{order.id.slice(0, 8)}</td>
                  <td className="p-3">
                    <div>
                      <div className="font-bold">{order.customer_name}</div>
                      <div className="text-sm text-gray-400">{order.email}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-3">UGX {order.amount.toLocaleString()}</td>
                  <td className="p-3">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-gray-800 text-white p-1 rounded text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-sm">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;