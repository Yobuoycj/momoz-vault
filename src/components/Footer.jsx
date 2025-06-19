import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-light-gold py-12 px-6 border-t border-dark-gold">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-serif text-gold mb-4">Momoz Oil Perfume Vault</h3>
          <p className="text-sm mb-4">
            Your destination for premium, affordable fragrances for both men and women. 
            Experience luxury with every scent.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full hover:bg-gold hover:text-black">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full hover:bg-gold hover:text-black">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-full hover:bg-gold hover:text-black">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/products" className="hover:text-gold">Products</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/my-orders" className="hover:text-gold">My Orders</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-gold">Shipping Policy</Link></li>
            <li><Link to="#" className="hover:text-gold">Returns & Refunds</Link></li>
            <li><Link to="#" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-gold">Terms & Conditions</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <i className="fas fa-map-marker-alt mt-1 text-gold"></i>
              <span>Kampala, Uganda</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-phone mt-1 text-gold"></i>
              <span>+256 704 443 171</span>
            </li>
            <li className="flex items-start gap-2">
              <i className="fas fa-envelope mt-1 text-gold"></i>
              <span>morynzeal@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Momoz Oil Perfume Vault. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;