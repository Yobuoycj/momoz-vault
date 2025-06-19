import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/client';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (search) {
          query = query.ilike('name', `%${search}%`);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-gold">Manage Products</h1>
        <Link 
          to="/admin/products/new"
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Add Product
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full p-3 rounded bg-gray-800 text-white pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="fas fa-search"></i>
          </div>
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
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-xl font-bold mb-2">No Products Found</h2>
          <p className="text-gray-400 mb-6">
            {search ? 'No products match your search' : 'You haven\'t added any products yet'}
          </p>
          <Link 
            to="/admin/products/new"
            className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white inline-block"
          >
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price (UGX)</th>
                <th className="p-3">Origin</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="bg-gray-800 w-12 h-12 rounded flex items-center justify-center">
                          <i className="fas fa-wine-bottle text-gray-600"></i>
                        </div>
                      )}
                      <div>
                        <div className="font-bold">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.scent_notes}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.price_ugx.toLocaleString()}</td>
                  <td className="p-3">{product.origin}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Delete
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

export default ManageProducts;