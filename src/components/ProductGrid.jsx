import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg animate-pulse">
            <div className="h-64 bg-gray-800"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 mb-2">
          <i className="fas fa-exclamation-circle text-4xl"></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">Failed to load products</h3>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <i className="fas fa-box-open text-4xl"></i>
        </div>
        <h3 className="text-xl font-semibold">No products found</h3>
        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;