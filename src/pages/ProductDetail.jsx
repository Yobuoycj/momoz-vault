import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabase/client';
import OriginFlag from '../components/OriginFlag';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Fetch main product
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Product not found');
        
        setProduct(data);
        
        // Fetch related products
        const { data: related } = await supabase
          .from('products')
          .select('*')
          .neq('id', id)
          .limit(4);
        
        setRelatedProducts(related || []);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-5xl animate-spin">🔄</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-400 mb-6 text-center">{error}</p>
        <a 
          href="/products" 
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded text-white"
        >
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Product Section */}
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="relative">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
              />
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-lg h-[500px] flex items-center justify-center">
                <i className="fas fa-wine-bottle text-6xl text-gray-700"></i>
              </div>
            )}
            <OriginFlag country={product.origin || 'Uganda'} />
          </div>
          
          <div>
            <h1 className="text-3xl font-serif text-gold mb-2">{product.name}</h1>
            <p className="text-pink-300 mb-4">{product.category}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-2xl font-bold text-gold">
                UGX {product.price_ugx.toLocaleString()}
              </div>
              <div className="text-gray-400">
                KES {product.price_kes.toLocaleString()}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-serif text-gold mb-3">Scent Notes</h2>
              <p className="text-gray-300">{product.scent_notes}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-serif text-gold mb-3">Description</h2>
              <p className="text-gray-300">{product.description}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-700 rounded">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  -
                </button>
                <div className="px-4 py-2">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded text-white font-bold flex items-center gap-2"
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
              
              {addedToCart && (
                <div className="text-green-400 flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  Added to cart!
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-bold mb-3">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400">Size</div>
                  <div>30ml</div>
                </div>
                <div>
                  <div className="text-gray-400">Concentration</div>
                  <div>Eau de Parfum</div>
                </div>
                <div>
                  <div className="text-gray-400">Origin</div>
                  <div>{product.origin || 'Uganda'}</div>
                </div>
                <div>
                  <div className="text-gray-400">Longevity</div>
                  <div>6-8 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-gold mb-6">You May Also Like</h2>
          
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <div key={prod.id} className="bg-gray-900 rounded-lg overflow-hidden">
                  <a href={`/product/${prod.id}`}>
                    <div className="h-48 overflow-hidden">
                      {prod.image_url ? (
                        <img 
                          src={prod.image_url} 
                          alt={prod.name} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                          <i className="fas fa-wine-bottle text-4xl text-gray-600"></i>
                        </div>
                      )}
                    </div>
                  </a>
                  <div className="p-4">
                    <a href={`/product/${prod.id}`}>
                      <h3 className="font-bold text-pink-300 mb-1">{prod.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">{prod.scent_notes}</p>
                    </a>
                    <div className="flex justify-between items-center">
                      <div className="text-gold">UGX {prod.price_ugx.toLocaleString()}</div>
                      <button
                        onClick={() => addToCart(prod)}
                        className="text-gray-400 hover:text-pink-400"
                        title="Add to cart"
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No related products found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;