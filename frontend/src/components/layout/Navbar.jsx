import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">🛍️</span>
            </div>
            <span className="text-2xl font-black text-gray-800 group-hover:text-primary-600 transition-colors duration-300">Kartify</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`navbar-link group ${isActive('/') ? 'active' : ''}`}
            >
              <span className="mr-2">🏠</span>
              Home
            </Link>
            <Link 
              to="/products" 
              className={`navbar-link group ${isActive('/products') ? 'active' : ''}`}
            >
              <span className="mr-2">🛍️</span>
              Products
            </Link>
            <Link 
              to="/about" 
              className={`navbar-link group ${isActive('/about') ? 'active' : ''}`}
            >
              <span className="mr-2">ℹ️</span>
              About
            </Link>
            {/* <Link 
              to="/contact" 
              className={`navbar-link group ${isActive('/contact') ? 'active' : ''}`}
            >
              <span className="mr-2">📞</span>
              Contact
            </Link> */}

            {/* Authenticated User Links */}
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`navbar-link group ${isActive('/dashboard') ? 'active' : ''}`}
                >
                  <span className="mr-2">📊</span>
                  Dashboard
                </Link>
                <Link 
                  to="/family" 
                  className={`navbar-link group ${isActive('/family') ? 'active' : ''}`}
                >
                  <span className="mr-2">👨‍👩‍👧‍👦</span>
                  Family
                </Link>
                <Link 
                  to="/shopping-lists" 
                  className={`navbar-link group ${isActive('/shopping-lists') ? 'active' : ''}`}
                >
                  <span className="mr-2">📋</span>
                  Lists
                </Link>
                <Link 
                  to="/inventory" 
                  className={`navbar-link group ${isActive('/inventory') ? 'active' : ''}`}
                >
                  <span className="mr-2">📦</span>
                  Inventory
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md group-hover:shadow-lg transition-all duration-200">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="font-medium">Hi, {user?.name || 'User'}!</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn-outline text-sm hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                >
                  <span className="mr-2">🚪</span>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="navbar-link font-semibold"
                >
                  <span className="mr-2">🔐</span>
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <span className="mr-2">✨</span>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
            <div className="py-4 space-y-2">
              <Link 
                to="/" 
                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">🏠</span>
                Home
              </Link>
              <Link 
                to="/products" 
                className={`mobile-nav-link ${isActive('/products') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">🛍️</span>
                Products
              </Link>
              <Link 
                to="/about" 
                className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">ℹ️</span>
                About
              </Link>
              {/* <Link 
                to="/contact" 
                className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">📞</span>
                Contact
              </Link> */}

              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link 
                    to="/dashboard" 
                    className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">📊</span>
                    Dashboard
                  </Link>
                  <Link 
                    to="/family" 
                    className={`mobile-nav-link ${isActive('/family') ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">👨‍👩‍👧‍👦</span>
                    Family
                  </Link>
                  <Link 
                    to="/shopping-lists" 
                    className={`mobile-nav-link ${isActive('/shopping-lists') ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">📋</span>
                    Shopping Lists
                  </Link>
                  <Link 
                    to="/inventory" 
                    className={`mobile-nav-link ${isActive('/inventory') ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">📦</span>
                    Inventory
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`mobile-nav-link ${isActive('/profile') ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">👤</span>
                    Profile
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="mobile-nav-link text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <span className="mr-3">🚪</span>
                    Logout
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link 
                    to="/login" 
                    className="mobile-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">🔐</span>
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="mobile-nav-link bg-primary-500 text-white hover:bg-primary-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">✨</span>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
