import React, { useState } from 'react';

const Inventory = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const inventoryItems = [
    {
      id: 1,
      name: 'Whole Milk',
      category: 'dairy',
      quantity: 2,
      unit: 'gallons',
      lowStockThreshold: 1,
      expiryDate: '2025-07-15',
      location: 'Refrigerator',
      icon: '🥛',
      status: 'good'
    },
    {
      id: 2,
      name: 'Bread',
      category: 'bakery',
      quantity: 1,
      unit: 'loaves',
      lowStockThreshold: 1,
      expiryDate: '2025-07-12',
      location: 'Pantry',
      icon: '🍞',
      status: 'low'
    },
    {
      id: 3,
      name: 'Apples',
      category: 'produce',
      quantity: 0,
      unit: 'lbs',
      lowStockThreshold: 2,
      expiryDate: null,
      location: 'Fruit Bowl',
      icon: '🍎',
      status: 'out'
    },
    {
      id: 4,
      name: 'Toilet Paper',
      category: 'household',
      quantity: 12,
      unit: 'rolls',
      lowStockThreshold: 4,
      expiryDate: null,
      location: 'Bathroom Cabinet',
      icon: '🧻',
      status: 'good'
    },
    {
      id: 5,
      name: 'Orange Juice',
      category: 'beverages',
      quantity: 1,
      unit: 'bottles',
      lowStockThreshold: 1,
      expiryDate: '2025-07-20',
      location: 'Refrigerator',
      icon: '🥤',
      status: 'expiring'
    },
    {
      id: 6,
      name: 'Pasta',
      category: 'pantry',
      quantity: 3,
      unit: 'boxes',
      lowStockThreshold: 2,
      expiryDate: '2026-01-15',
      location: 'Pantry',
      icon: '🍝',
      status: 'good'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', count: inventoryItems.length },
    { id: 'dairy', name: 'Dairy', count: inventoryItems.filter(item => item.category === 'dairy').length },
    { id: 'produce', name: 'Produce', count: inventoryItems.filter(item => item.category === 'produce').length },
    { id: 'pantry', name: 'Pantry', count: inventoryItems.filter(item => item.category === 'pantry').length },
    { id: 'household', name: 'Household', count: inventoryItems.filter(item => item.category === 'household').length },
    { id: 'beverages', name: 'Beverages', count: inventoryItems.filter(item => item.category === 'beverages').length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'border-green-200 bg-green-50';
      case 'low': return 'border-yellow-200 bg-yellow-50';
      case 'out': return 'border-red-200 bg-red-50';
      case 'expiring': return 'border-orange-200 bg-orange-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'out': return 'bg-red-100 text-red-800';
      case 'expiring': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const statusCounts = {
    good: inventoryItems.filter(item => item.status === 'good').length,
    low: inventoryItems.filter(item => item.status === 'low').length,
    out: inventoryItems.filter(item => item.status === 'out').length,
    expiring: inventoryItems.filter(item => item.status === 'expiring').length,
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Smart Inventory
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Keep track of what you have at home with intelligent stock monitoring and expiry alerts.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl">📦</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Quick Actions */}
        <div className="card-modern mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Household Inventory</h2>
              <p className="text-gray-600">Track your items and never run out of essentials</p>
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <span>📷</span>
                <span>Scan Item</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <span>➕</span>
                <span>Add Item</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center border-l-4 border-green-400">
            <div className="text-3xl font-bold text-green-600 mb-1">{statusCounts.good}</div>
            <div className="text-sm text-gray-600">Well Stocked</div>
          </div>
          <div className="card text-center border-l-4 border-yellow-400">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{statusCounts.low}</div>
            <div className="text-sm text-gray-600">Low Stock</div>
          </div>
          <div className="card text-center border-l-4 border-red-400">
            <div className="text-3xl font-bold text-red-600 mb-1">{statusCounts.out}</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </div>
          <div className="card text-center border-l-4 border-orange-400">
            <div className="text-3xl font-bold text-orange-600 mb-1">{statusCounts.expiring}</div>
            <div className="text-sm text-gray-600">Expiring Soon</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card-modern mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Items
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search your inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map(item => (
            <div key={item.id} className={`card border-l-4 hover:shadow-lg transition-all duration-300 ${getStatusColor(item.status)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                      {item.status === 'good' ? 'In Stock' : 
                       item.status === 'low' ? 'Low Stock' :
                       item.status === 'out' ? 'Out of Stock' : 'Expiring Soon'}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  ⋮
                </button>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Quantity</span>
                  <span className="font-bold text-lg">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                {item.quantity > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        item.quantity <= item.lowStockThreshold ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${Math.min((item.quantity / (item.lowStockThreshold * 2)) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{item.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium capitalize">{item.category}</span>
                </div>
                {item.expiryDate && (
                  <div className="flex justify-between">
                    <span>Expires:</span>
                    <span className="font-medium">{item.expiryDate}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="btn-primary flex-1 text-sm">
                  {item.quantity === 0 ? 'Restock' : 'Update'}
                </button>
                <button className="btn-secondary text-sm px-3">
                  Add to List
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Add */}
        <div className="card-modern">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Quick Add Common Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['🥛 Milk', '🍞 Bread', '🍎 Apples', '🥚 Eggs', '🧻 Toilet Paper', '🧴 Shampoo'].map((item, index) => (
              <button key={index} className="card p-4 text-center hover:shadow-md transition-all duration-200 hover:scale-105">
                <div className="text-2xl mb-2">{item.split(' ')[0]}</div>
                <div className="text-sm font-medium">{item.split(' ').slice(1).join(' ')}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
