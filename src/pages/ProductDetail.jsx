import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useCurrency } from '../context/CurrencyContext';

function ProductDetail() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { currency } = useCurrency();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Get price based on selected currency
  const getPrice = () => {
    return currency === 'UGX' 
      ? { price: product.price_ugx, symbol: 'UGX' }
      : { price: product.price_kes, symbol: 'KES' };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const productData = await getProductById(id);
      setProduct(productData);
      setLoading(false);
    };

    fetchProduct();
  }, [id, getProductById]);

  // Handle loading and not found states
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        Product not found.
      </div>
    );
  }

  const { price, symbol } = getPrice();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-xl p-6">
          <img 
            src={product.image_url}
            alt={product.title}
            className="w-full rounded-lg"
            style={{ maxWidth: 2000, height: 'auto' }}
            onError={e => { e.target.onerror = null; e.target.src = 'fallback.jpg'; }}
          />
        </div>
        
        <div className="text-white">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-400 mb-1">Category: {product.category}</p>
          <p className="text-gray-400 mb-4">Origin: {product.origin}</p>
          
          <div className="mb-6">
            <span className="text-2xl text-yellow-400 font-bold">
              {symbol} {price.toLocaleString()}
            </span>
          </div>
          
          <p className="mb-8 text-gray-300">{product.description}</p>
          
          <div className="flex items-center mb-8">
            <label className="mr-4">Quantity:</label>
            <div className="flex items-center border border-gray-700 rounded">
              <button 
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button 
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
            <span className="ml-4 text-gray-400">
              Stock: {product.stock}
            </span>
          </div>
          
          <button
            onClick={() => {
              // Add selected quantity to cart
              const productToAdd = { ...product, quantity };
              addToCart(productToAdd);
            }}
            className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Additional product info section */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <h3 className="text-xl font-bold mb-4">Product Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Specifications</h4>
            <ul className="text-gray-300">
              <li>Origin: {product.origin}</li>
              <li>Category: {product.category}</li>
              <li>Stock: {product.stock} units available</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Pricing</h4>
            <ul className="text-gray-300">
              <li>UGX Price: {product.price_ugx.toLocaleString()} UGX</li>
              <li>KES Price: {product.price_kes.toLocaleString()} KES</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;