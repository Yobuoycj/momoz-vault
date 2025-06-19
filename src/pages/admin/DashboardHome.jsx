import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    revenue: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch orders count
        const { count: ordersCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact' });
        
        // Fetch products count
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact' });
        
        // Fetch revenue
        const { data: revenueData } = await supabase
          .from('orders')
          .select('amount');
        
        const revenue = revenueData?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;
        
        // Fetch messages count
        const { count: messagesCount } = await supabase
          .from('reviews')
          .select('*', { count: 'exact' });
        
        setStats({
          orders: ordersCount || 0,
          products: productsCount || 0,
          revenue,
          messages: messagesCount || 0
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-serif text-gold mb-8">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: 'Total Orders', 
            value: stats.orders, 
            icon: 'fas fa-shopping-cart',
            color: 'bg-pink-600'
          },
          { 
            title: 'Total Products', 
            value: stats.products, 
            icon: 'fas fa-wine-bottle',
            color: 'bg-purple-600'
          },
          { 
            title: 'Total Revenue', 
            value: `UGX ${stats.revenue.toLocaleString()}`, 
            icon: 'fas fa-money-bill-wave',
            color: 'bg-green-600'
          },
          { 
            title: 'Messages', 
            value: stats.messages, 
            icon: 'fas fa-envelope',
            color: 'bg-blue-600'
          }
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-lg p-6 text-white`}>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-1">{stat.title}</div>
              </div>
              <div className="text-3xl">
                <i className={stat.icon}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-serif text-gold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { 
                title: 'Add New Product', 
                icon: 'fas fa-plus',
                link: '/admin/products/new'
              },
              { 
                title: 'View Orders', 
                icon: 'fas fa-list',
                link: '/admin/orders'
              },
              { 
                title: 'Manage Products', 
                icon: 'fas fa-edit',
                link: '/admin/products'
              },
              { 
                title: 'View Messages', 
                icon: 'fas fa-comments',
                link: '/admin/messages'
              }
            ].map((action, i) => (
              <a 
                key={i} 
                href={action.link}
                className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded transition"
              >
                <div className="text-gold text-xl">
                  <i className={action.icon}></i>
                </div>
                <div className="font-medium">{action.title}</div>
              </a>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-serif text-gold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 animate-pulse">
                  <div>
                    <div className="h-4 bg-gray-800 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-24"></div>
                  </div>
                  <div className="h-3 bg-gray-800 rounded w-16"></div>
                </div>
              ))
            ) : stats.orders > 0 ? (
              [...Array(Math.min(3, stats.orders))].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 border-b border-gray-800">
                  <div>
                    <div className="font-bold">Order #ORD{i+1}00</div>
                    <div className="text-sm text-gray-400">Just now</div>
                  </div>
                  <div className="text-gold">UGX 120,000</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No recent orders
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;