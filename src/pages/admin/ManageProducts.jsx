import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/supabase';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // ... existing state and functions ...

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    origin: '',
    price_ugx: '',
    price_kes: '',
    image_url: '',
    stock: 0,
    featured: false
  });

  // ... handleChange, handleSubmit, handleEdit, handleDelete ...

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Form */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded text-white"
                rows="3"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Origin</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded text-white"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2">Price (UGX)</label>
                <input
                  type="number"
                  name="price_ugx"
                  value={formData.price_ugx}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded text-white"
                  min="0"
                  step="1000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Price (KES)</label>
                <input
                  type="number"
                  name="price_kes"
                  value={formData.price_kes}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded text-white"
                  min="0"
                  step="100"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded text-white"
                min="0"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 rounded text-white"
                required
              />
            </div>
            
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2"
                id="featured"
              />
              <label htmlFor="featured" className="text-gray-300">
                Featured Product
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 text-black py-2 rounded font-bold hover:bg-yellow-400 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
        
        {/* Product List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Product List</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Origin</th>
                  <th className="py-2 px-4 text-left">UGX Price</th>
                  <th className="py-2 px-4 text-left">KES Price</th>
                  <th className="py-2 px-4 text-left">Stock</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">{product.origin}</td>
                    <td className="py-3 px-4">{product.price_ugx.toLocaleString()}</td>
                    <td className="py-3 px-4">{product.price_kes.toLocaleString()}</td>
                    <td className="py-3 px-4">{product.stock}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="mr-2 text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;