import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartIcon from './CartIcon';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useCurrency } from '../context/CurrencyContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

  const isActive = (path) => {
    return location.pathname === path ? 'text-gold border-b-2 border-gold' : 'hover:text-gold';
  };

  return (
    <header className="bg-black text-white py-4 px-6 sticky top-0 z-50 shadow-lg border-b border-dark-gold">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="text-gold text-2xl">
            <i className="fas fa-wine-bottle"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold">MOMOZ</h1>
            <p className="text-xs text-light-gold italic">Oil Perfume Vault</p>
          </div>
        </Link>

        {/* Currency Selector - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2">Currency:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-800 text-white p-1 rounded"
            >
              <option value="UGX">UGX</option>
              <option value="KES">KES</option>
            </select>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className={`${isActive('/')} pb-1 transition`}>
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`hover:text-yellow-400 ${location.pathname === '/products' ? 'text-yellow-400' : ''}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className={`${isActive('/about')} pb-1 transition`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`${isActive('/contact')} pb-1 transition`}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="flex items-center gap-2 text-gold hover:text-yellow-400 transition" title="Login">
                <FaSignInAlt size={20} />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link to="/create-account" className="flex items-center gap-2 text-gold hover:text-yellow-400 transition" title="Create Account">
                <FaUserPlus size={20} />
                <span>Create Account</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <CartIcon />
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="space-y-3">
            <li>
              <Link 
                to="/" 
                className={`${isActive('/')} block py-2 transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`${isActive('/products')} block py-2 transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`${isActive('/about')} block py-2 transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`${isActive('/contact')} block py-2 transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/cart" 
                className="flex items-center gap-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="bg-gold text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                className="flex items-center gap-2 py-2 text-gold"
                onClick={() => setMobileMenuOpen(false)}
                title="Login"
              >
                <FaSignInAlt size={20} />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/create-account" 
                className="flex items-center gap-2 py-2 text-gold"
                onClick={() => setMobileMenuOpen(false)}
                title="Create Account"
              >
                <FaUserPlus size={20} />
                <span>Create Account</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;