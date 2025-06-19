import React from 'react';
import { Link } from 'react-router-dom';

const AdminTopBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/admin/dashboard" className="text-xl font-bold text-gold">
          Momoz Vault Admin
        </Link>
      </div>
      
      <div className="flex gap-4">
        <Link 
          to="/admin/dashboard" 
          className="px-3 py-1 hover:bg-gray-700 rounded"
        >
          Dashboard
        </Link>
        <Link 
          to="/admin/products" 
          className="px-3 py-1 hover:bg-gray-700 rounded"
        >
          Products
        </Link>
        <Link 
          to="/admin/orders" 
          className="px-3 py-1 hover:bg-gray-700 rounded"
        >
          Orders
        </Link>
        <Link 
          to="/admin/messages" 
          className="px-3 py-1 hover:bg-gray-700 rounded"
        >
          Messages
        </Link>
        <Link 
          to="/admin/analytics" 
          className="px-3 py-1 hover:bg-gray-700 rounded"
        >
          Analytics
        </Link>
        <Link 
          to="/" 
          className="px-3 py-1 bg-pink-600 hover:bg-pink-700 rounded"
        >
          View Store
        </Link>
      </div>
    </nav>
  );
};

export default AdminTopBar;