import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-primary-100 text-lg md:text-xl">
              Here's what's happening with your family shopping today
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mb-16"></div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="card-modern group hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">📋</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">3</div>
                <p className="text-gray-600 text-sm">Active Lists</p>
              </div>
            </div>
          </div>
          <div className="card-modern group hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🛒</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
                <p className="text-gray-600 text-sm">Items to Buy</p>
              </div>
            </div>
          </div>
          <div className="card-modern group hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">📦</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">45</div>
                <p className="text-gray-600 text-sm">Items in Stock</p>
              </div>
            </div>
          </div>
          <div className="card-modern group hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">💰</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 mb-1">$127</div>
                <p className="text-gray-600 text-sm">This Month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="card-modern">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Quick Actions</h2>
              <div className="space-y-4">
                <Link to="/shopping-lists" className="block w-full btn-primary text-center group">
                  <span className="mr-2">📋</span>
                  View Shopping Lists
                </Link>
                <Link to="/inventory" className="block w-full btn-secondary text-center group">
                  <span className="mr-2">📦</span>
                  Check Inventory
                </Link>
                <Link to="/products" className="block w-full btn-secondary text-center group">
                  <span className="mr-2">🛍️</span>
                  Browse Products
                </Link>
                <Link to="/family" className="block w-full btn-secondary text-center group">
                  <span className="mr-2">👨‍👩‍👧‍👦</span>
                  Manage Family
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="card-modern">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">📋</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">New shopping list created</p>
                    <p className="text-sm text-gray-600">Weekly Groceries • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Sarah added 3 items to "Weekend BBQ"</p>
                    <p className="text-sm text-gray-600">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Low stock alert: Milk</p>
                    <p className="text-sm text-gray-600">6 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">✅</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Shopping trip completed</p>
                    <p className="text-sm text-gray-600">Target • Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Shopping Lists */}
        <div className="mt-8">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Current Shopping Lists</h2>
              <Link to="/shopping-lists" className="text-green-600 hover:text-green-700 text-sm">
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Weekly Groceries</h3>
                <p className="text-sm text-gray-600 mb-3">8 items • Created today</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progress: 3/8</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '37.5%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Weekend BBQ</h3>
                <p className="text-sm text-gray-600 mb-3">5 items • Created 2 days ago</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progress: 1/5</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Household Items</h3>
                <p className="text-sm text-gray-600 mb-3">3 items • Created 1 week ago</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progress: 2/3</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '66.7%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">🤖 AI Suggestions</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">You usually buy milk every Tuesday</p>
                  <p className="text-sm text-gray-600">Based on your shopping history</p>
                </div>
                <button className="btn-outline text-sm">Add to List</button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Bread is running low in your inventory</p>
                  <p className="text-sm text-gray-600">Last updated 3 days ago</p>
                </div>
                <button className="btn-outline text-sm">Add to List</button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Great deals on apples this week</p>
                  <p className="text-sm text-gray-600">Save 25% at nearby stores</p>
                </div>
                <button className="btn-outline text-sm">View Deals</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
