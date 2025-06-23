import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products with new fields
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4);
    
    if (!error) setFeaturedProducts(data);
  };

  // Fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .neq('category', null);
    
    if (!error) {
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    }
  };

  // Get product by ID
  const getProductById = async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    return error ? null : data;
  };

  // Add this function inside ProductProvider
  const updateProduct = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      fetchProducts(); // Refresh product list
      return true;
    } catch (error) {
      console.error('Error updating product:', error.message);
      return false;
    }
  };

  // Initialize
  useEffect(() => {
    fetchProducts();
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const value = {
    products,
    featuredProducts,
    categories,
    loading,
    fetchProducts,
    getProductById,
    updateProduct // <-- add this
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}