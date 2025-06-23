import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/ProductGrid';

function Products() {
  const { products, loading } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">All Products</h1>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

export default Products;