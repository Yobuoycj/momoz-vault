import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform group-hover:-translate-y-2">
        <div className="h-64 overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-gold font-bold text-lg mb-1">{product.name}</h3>
          <p className="text-light-gold text-sm italic mb-3">{product.scent_notes}</p>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="bg-gray-800 text-light-gold px-3 py-1 rounded-full text-sm">
                UGX {product.price_ugx.toLocaleString()}
              </span>
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;