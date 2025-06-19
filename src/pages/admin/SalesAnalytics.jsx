import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [timeframe, setTimeframe] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        
        // Get start date based on timeframe
        let startDate = new Date();
        if (timeframe === 'week') {
          startDate.setDate(startDate.getDate() - 7);
        } else if (timeframe === 'month') {
          startDate.setMonth(startDate.getMonth() - 1);
        } else { // year
          startDate.setFullYear(startDate.getFullYear() - 1);
        }
        
        const startDateISO = startDate.toISOString();
        
        // Fetch orders within timeframe
        const { data, error } = await supabase
          .from('orders')
          .select('created_at, amount')
          .gte('created_at', startDateISO)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        setSalesData(data || []);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Failed to load sales analytics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSalesData();
  }, [timeframe]);

  // Calculate total revenue
  const totalRevenue = salesData.reduce((sum, order) => sum + (order.amount || 0), 0);
  
  // Calculate number of orders
  const orderCount = salesData.length;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-serif text-gold mb-8">Sales Analytics</h1>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setTimeframe('week')}
            className={`px-4 py-2 rounded ${timeframe === 'week' ? 'bg-pink-600' : 'bg-gray-800'}`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-4 py-2 rounded ${timeframe === 'month' ? 'bg-pink-600' : 'bg-gray-800'}`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeframe('year')}
            className={`px-4 py-2 rounded ${timeframe === 'year' ? 'bg-pink-600' : 'bg-gray-800'}`}
          >
            Last 12 Months
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900 text-red-200 p-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-pink-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">{orderCount}</div>
          <div>Total Orders</div>
        </div>
        <div className="bg-purple-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">UGX {totalRevenue.toLocaleString()}</div>
          <div>Total Revenue</div>
        </div>
        <div className="bg-blue-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">UGX {orderCount ? Math.floor(totalRevenue / orderCount).toLocaleString() : '0'}</div>
          <div>Average Order Value</div>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-serif text-gold mb-6">Revenue Overview</h2>
        
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-5xl animate-spin">🔄</div>
          </div>
        ) : salesData.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-gray-400">No sales data available</p>
          </div>
        ) : (
          <div className="h-64 flex items-end gap-2">
            {salesData.map((order, i) => (
              <div 
                key={i} 
                className="flex-1 bg-pink-600" 
                style={{ height: `${(order.amount / 500000) * 100}%` }}
                title={`UGX ${order.amount}`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesAnalytics;