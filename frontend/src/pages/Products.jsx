import React, { useState } from 'react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'groceries', name: 'Groceries', icon: '🥬' },
    { id: 'household', name: 'Household', icon: '🧽' },
    { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
  ];

  const products = [
    { id: 1, name: 'Organic Bananas', category: 'groceries', price: 2.99, image: '🍌', description: 'Fresh organic bananas, perfect for smoothies', rating: 4.5 },
    { id: 2, name: 'Whole Milk', category: 'groceries', price: 3.49, image: '🥛', description: '1 gallon of fresh whole milk', rating: 4.7 },
    { id: 3, name: 'Multi-Surface Cleaner', category: 'household', price: 4.99, image: '🧽', description: 'All-purpose cleaner for every surface', rating: 4.3 },
    { id: 4, name: 'Shampoo & Conditioner', category: 'personal-care', price: 8.99, image: '🧴', description: 'Nourishing hair care set', rating: 4.6 },
    { id: 5, name: 'Wireless Earbuds', category: 'electronics', price: 49.99, image: '🎧', description: 'High-quality wireless earbuds', rating: 4.4 },
    { id: 6, name: 'Orange Juice', category: 'beverages', price: 4.99, image: '🥤', description: 'Fresh squeezed orange juice', rating: 4.8 },
    { id: 7, name: 'Organic Apples', category: 'groceries', price: 5.99, image: '🍎', description: 'Crisp organic apples, 3 lb bag', rating: 4.5 },
    { id: 8, name: 'Toilet Paper', category: 'household', price: 12.99, image: '🧻', description: '12-pack ultra soft toilet paper', rating: 4.6 },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Product Catalog
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Discover thousands of products for your family. Search, compare, and add items to your shopping lists with ease.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl">🛍️</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 mb-8">
        <div className="card-modern">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
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
            <div className="md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`card p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-medium text-sm text-gray-800">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="card-modern text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="card group hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{product.image}</div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="text-2xl font-bold text-primary-600 mb-4">
                    ${product.price}
                  </div>
                  
                  {/* Actions */}
                  <div className="space-y-2">
                    {/* <button className="btn-primary w-full text-sm">
                      Add to Cart
                    </button> */}
                    <button className="btn-secondary w-full text-sm">
                      Add to List
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
