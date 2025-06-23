import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

const ProductForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price_ugx: '',
    price_kes: '',
    scent_notes: '',
    category: '',
    origin: 'Uganda',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validate form
    if (!form.name.trim() || !form.description.trim() || !form.price_ugx || !form.price_kes) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    try {
      // Save to Supabase
      const { data, error: supabaseError } = await supabase
        .from('products')
        .insert([{
          ...form,
          price_ugx: Number(form.price_ugx),
          price_kes: Number(form.price_kes)
        }]);
      
      if (supabaseError) throw supabaseError;
      
      setSuccess('Product added successfully!');
      
      // Clear form after successful submission
      setForm({
        name: '',
        description: '',
        price_ugx: '',
        price_kes: '',
        scent_notes: '',
        category: '',
        origin: 'Uganda',
        image_url: ''
      });
      
      // Redirect after delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gold">Add New Product</h1>
          <button 
            onClick={() => navigate('/admin/products')}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Back to Products
          </button>
        </div>
        
        {(error || success) && (
          <div className={`mb-6 p-4 rounded ${error ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
            {error || success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white"
                required
              >
                <option value="">Select a category</option>
                <option value="Oil Perfume">Oil Perfume</option>
                <option value="Body Spray">Body Spray</option>
                <option value="Fragrance Oil">Fragrance Oil</option>
                <option value="Perfume">Perfume</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded bg-gray-800 text-white"
              required
            ></textarea>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2">Scent Notes</label>
              <input
                type="text"
                name="scent_notes"
                value={form.scent_notes}
                onChange={handleChange}
                placeholder="Top, middle, base notes"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Origin</label>
              <select
                name="origin"
                value={form.origin}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-800 text-white"
              >
                <option value="Uganda">Uganda</option>
                <option value="Kenya">Kenya</option>
                <option value="International">International</option>
              </select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-400 mb-2">Price (UGX) *</label>
              <input
                type="number"
                name="price_ugx"
                value={form.price_ugx}
                onChange={handleChange}
                min="0"
                step="1000"
                className="w-full p-3 rounded bg-gray-800 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Price (KES) *</label>
              <input
                type="number"
                name="price_kes"
                value={form.price_kes}
                onChange={handleChange}
                min="0"
                step="100"
                className="w-full p-3 rounded bg-gray-800 text-white"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Image URL</label>
            <input
              type="url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 rounded bg-gray-800 text-white"
            />
            {form.image_url && (
              <div className="mt-4">
                <div className="text-gray-400 mb-2">Image Preview:</div>
                <img 
                  src={form.image_url} 
                  alt="Preview" 
                  className="max-w-full h-40 object-contain border border-gray-700 rounded"
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 py-3 rounded text-white font-bold disabled:opacity-50"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;