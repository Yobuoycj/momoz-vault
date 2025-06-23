import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { currency } = useCurrency();

  // Get price based on selected currency
  const getPrice = () => {
    return currency === 'UGX' 
      ? { price: product.price_ugx, symbol: 'UGX' }
      : { price: product.price_kes, symbol: 'KES' };
  };

  const { price, symbol } = getPrice();

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image_url} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-bold text-lg mb-1">{product.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{product.category}</p>
          <p className="text-gray-500 text-xs">{product.origin}</p>
        </Link>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-yellow-400 font-bold">
            {symbol} {price.toLocaleString()}
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-yellow-500 text-black px-3 py-1 rounded-md hover:bg-yellow-400 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;