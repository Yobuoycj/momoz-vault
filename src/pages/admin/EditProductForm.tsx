// src/components/admin/EditProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { supabase } from '../../supabase/supabase';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  // Define Product type or import it if already defined elsewhere
  type Product = {
    id: string;
    title: string;
    description: string;
    category: string;
    origin: string;
    price_ugx: number;
    price_kes: number;
    image_url: string;
    stock: number;
    featured: boolean;
    // add any other fields as needed
  };

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    origin: '',
    price_ugx: '',
    price_kes: '',
    image_url: '',
    stock: '',
    featured: false
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const productData = await getProductById(id);
      if (productData) {
        setProduct(productData);
        setFormData({
          title: productData.title,
          description: productData.description,
          category: productData.category,
          origin: productData.origin,
          price_ugx: productData.price_ugx.toString(),
          price_kes: productData.price_kes.toString(),
          image_url: productData.image_url,
          stock: productData.stock.toString(),
          featured: productData.featured
        });
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, getProductById]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    setImageFile(file);
    
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from('products')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // Update form data with new URL
      setFormData(prev => ({
        ...prev,
        image_url: publicUrl
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error uploading image:', error.message);
      } else {
        console.error('Error uploading image:', error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Submit updated product
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('products')
        .update({
          ...formData,
          price_ugx: Number(formData.price_ugx),
          price_kes: Number(formData.price_kes),
          stock: Number(formData.stock),
        })
        .eq('id', id);

      if (error) throw error;
      
      alert('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating product:', error.message);
      } else {
        console.error('Error updating product:', String(error));
      }
      alert('Failed to update product');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading product data...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Product: {product.title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded text-white"
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Essential Oils">Essential Oils</option>
                  <option value="Perfumes">Perfumes</option>
                  <option value="Body Oils">Body Oils</option>
                  <option value="Gift Sets">Gift Sets</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Origin</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Price (UGX)</label>
                <input
                  type="number"
                  name="price_ugx"
                  value={formData.price_ugx}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded text-white"
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
                  className="w-full p-3 bg-gray-700 rounded text-white"
                  min="0"
                  step="100"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded text-white"
                min="0"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2 h-5 w-5"
                id="featured"
              />
              <label htmlFor="featured" className="text-gray-300">
                Featured Product
              </label>
            </div>
          </div>
          
          {/* Image Upload */}
          <div>
            <label className="block text-gray-300 mb-2">Product Image</label>
            
            {formData.image_url && (
              <div className="mb-4">
                <img 
                  src={formData.image_url} 
                  alt="Current product" 
                  className="w-full h-64 object-contain rounded-lg bg-gray-900"
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                {isUploading ? 'Uploading...' : 'Change Image'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="w-full text-white"
              />
            </div>
            
            {isUploading && (
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-yellow-500 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;