
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductListTable = () => {
  const { products, loading } = useProducts();

  const handleDelete = (productId: string | number) => {
    // TODO: Implement product deletion logic here
    // Example: call API or context method to delete product
    // alert(`Delete product with id: ${productId}`);
    console.log(`Delete product with id: ${productId}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">Product</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Price (UGX)</th>
            <th className="py-3 px-4 text-left">Stock</th>
            <th className="py-3 px-4 text-left">Featured</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-750">
              <td className="py-4 px-4">
                <div className="flex items-center">
                  {product.image_url && (
                    <img 
                      src={product.image_url} 
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-md mr-3"
                    />
                  )}
                  <div>
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-gray-400">{product.origin}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">{product.category}</td>
              <td className="py-4 px-4">{product.price_ugx.toLocaleString()}</td>
              <td className="py-4 px-4">{product.stock}</td>
              <td className="py-4 px-4">
                {product.featured ? (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                    Featured
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded-full text-xs">
                    Regular
                  </span>
                )}
              </td>
              <td className="py-4 px-4">
                <Link 
                  to={`/admin/products/edit/${product.id}`}
                  className="text-yellow-400 hover:text-yellow-300 mr-3"
                >
                  Edit
                </Link>
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
  );
};

export default ProductListTable;