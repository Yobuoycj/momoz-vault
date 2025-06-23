import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;