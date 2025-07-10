import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-500/10 rounded-full -mr-24 -mb-24"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-400/5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">🛍️</span>
              </div>
              <span className="text-2xl font-black text-white">Kartify</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Smart family shopping with AI-powered predictions, collaborative lists, and intelligent inventory management that transforms how families shop together.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700/50 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <span>📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700/50 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <span>🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700/50 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <span>📸</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700/50 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg">
                <span>💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-white flex items-center">
              <span className="mr-2">🔗</span>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-200">🏠</span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-200">🛍️</span>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-200">ℹ️</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-200">📞</span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-white flex items-center">
              <span className="mr-2">⭐</span>
              Features
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shopping-lists" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-200">📋</span>
                  Shopping Lists
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-200">📦</span>
                  Inventory Tracking
                </Link>
              </li>
              <li>
                <Link to="/family" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <span className="mr-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-200">👨‍👩‍👧‍👦</span>
                  Family Groups
                </Link>
              </li>
              <li>
                <span className="text-gray-300 flex items-center">
                  <span className="mr-2">🤖</span>
                  AI Predictions
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-white flex items-center">
              <span className="mr-2">📞</span>
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-200">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <span>📧</span>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p>support@kartify.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-200">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <span>📞</span>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-200">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <span>📍</span>
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p>123 Shopping St<br />Retail City, RC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-gray-400 text-sm">
              © 2025 Kartify. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>for families everywhere</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end space-x-6 mt-4 lg:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 hover:underline">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
