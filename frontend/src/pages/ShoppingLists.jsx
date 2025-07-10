import React, { useState } from 'react';

const ShoppingLists = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');

  const shoppingLists = [
    {
      id: 1,
      name: 'Weekly Groceries',
      items: 12,
      completed: 3,
      created: '2 hours ago',
      lastModified: '1 hour ago',
      collaborators: ['Sarah', 'Mike'],
      priority: 'high',
      icon: '🥬'
    },
    {
      id: 2,
      name: 'Weekend BBQ',
      items: 8,
      completed: 2,
      created: '2 days ago',
      lastModified: '6 hours ago',
      collaborators: ['Emma'],
      priority: 'medium',
      icon: '🔥'
    },
    {
      id: 3,
      name: 'Household Essentials',
      items: 5,
      completed: 4,
      created: '1 week ago',
      lastModified: '2 days ago',
      collaborators: ['Alex', 'Jordan'],
      priority: 'low',
      icon: '🏠'
    },
    {
      id: 4,
      name: 'Birthday Party Supplies',
      items: 15,
      completed: 0,
      created: '3 days ago',
      lastModified: '1 day ago',
      collaborators: ['Sarah', 'Mike', 'Emma'],
      priority: 'high',
      icon: '🎉'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Shopping Lists
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Create, share, and manage your family shopping lists with real-time collaboration.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl">📋</span>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Shopping Lists</h2>
              <p className="text-gray-600">Manage all your family's shopping needs in one place</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Create New List</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-1">4</div>
            <div className="text-sm text-gray-600">Active Lists</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">40</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">9</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">6</div>
            <div className="text-sm text-gray-600">Collaborators</div>
          </div>
        </div>

        {/* Shopping Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {shoppingLists.map(list => (
            <div key={list.id} className={`card hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-l-4 ${getPriorityColor(list.priority)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{list.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{list.name}</h3>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(list.priority)}`}>
                      {list.priority} priority
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  ⋮
                </button>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{list.completed}/{list.items} items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(list.completed / list.items) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Collaborators */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Collaborators</div>
                <div className="flex items-center space-x-1">
                  {list.collaborators.slice(0, 3).map((collaborator, index) => (
                    <div key={index} className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {collaborator[0]}
                    </div>
                  ))}
                  {list.collaborators.length > 3 && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
                      +{list.collaborators.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="text-xs text-gray-500 mb-4">
                <div>Created {list.created}</div>
                <div>Modified {list.lastModified}</div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="btn-primary flex-1 text-sm">View List</button>
                <button className="btn-secondary text-sm px-3">Share</button>
              </div>
            </div>
          ))}

          {/* Create New List Card */}
          <div 
            onClick={() => setShowCreateModal(true)}
            className="card border-2 border-dashed border-gray-300 hover:border-primary-400 cursor-pointer transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center text-center py-12 min-h-[300px]"
          >
            <div className="text-6xl text-gray-300 mb-4">➕</div>
            <h3 className="font-semibold text-gray-600 mb-2">Create New List</h3>
            <p className="text-gray-500 text-sm">Start a new shopping list for your family</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-modern">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                📋
              </div>
              <div className="flex-1">
                <p className="font-medium">Sarah added "Organic Tomatoes" to Weekend BBQ</p>
                <p className="text-sm text-gray-600">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                ✅
              </div>
              <div className="flex-1">
                <p className="font-medium">Mike completed "Milk" in Weekly Groceries</p>
                <p className="text-sm text-gray-600">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                👥
              </div>
              <div className="flex-1">
                <p className="font-medium">Emma joined "Birthday Party Supplies" list</p>
                <p className="text-sm text-gray-600">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Shopping List</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List Name
              </label>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Enter list name..."
                className="input-field"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setNewListName('');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle create list logic here
                  setShowCreateModal(false);
                  setNewListName('');
                }}
                className="btn-primary"
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingLists;
