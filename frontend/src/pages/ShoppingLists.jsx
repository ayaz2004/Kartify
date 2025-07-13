import React, { useState } from 'react';

const ShoppingLists = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showListDetails, setShowListDetails] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showPreviousBoughtModal, setShowPreviousBoughtModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newListIcon, setNewListIcon] = useState('🛒');
  const [newListPriority, setNewListPriority] = useState('medium');
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: 'Weekly Groceries',
      items: [
        { id: 1, name: 'Milk', completed: true, category: 'Dairy' },
        { id: 2, name: 'Bread', completed: true, category: 'Bakery' },
        { id: 3, name: 'Apples', completed: true, category: 'Fruits' },
        { id: 4, name: 'Chicken Breast', completed: false, category: 'Meat' },
        { id: 5, name: 'Rice', completed: false, category: 'Grains' },
      ],
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
      items: [
        { id: 1, name: 'Burger Buns', completed: true, category: 'Bakery' },
        { id: 2, name: 'Ground Beef', completed: true, category: 'Meat' },
        { id: 3, name: 'BBQ Sauce', completed: false, category: 'Condiments' },
        { id: 4, name: 'Lettuce', completed: false, category: 'Vegetables' },
      ],
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
      items: [
        { id: 1, name: 'Toilet Paper', completed: true, category: 'Household' },
        { id: 2, name: 'Dish Soap', completed: true, category: 'Cleaning' },
        { id: 3, name: 'Trash Bags', completed: true, category: 'Household' },
        { id: 4, name: 'Paper Towels', completed: true, category: 'Household' },
        { id: 5, name: 'Laundry Detergent', completed: false, category: 'Cleaning' },
      ],
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
      items: [],
      completed: 0,
      created: '3 days ago',
      lastModified: '1 day ago',
      collaborators: ['Sarah', 'Mike', 'Emma'],
      priority: 'high',
      icon: '🎉'
    }
  ]);

  // Previously bought lists (completed lists)
  const [previouslyBoughtLists, setPreviouslyBoughtLists] = useState([
    {
      id: 101,
      name: 'Last Week Groceries',
      items: [
        { id: 1, name: 'Milk', completed: true, category: 'Dairy', price: '$3.99' },
        { id: 2, name: 'Bread', completed: true, category: 'Bakery', price: '$2.49' },
        { id: 3, name: 'Eggs', completed: true, category: 'Dairy', price: '$4.99' },
        { id: 4, name: 'Chicken', completed: true, category: 'Meat', price: '$8.99' },
        { id: 5, name: 'Bananas', completed: true, category: 'Fruits', price: '$1.99' },
      ],
      completed: 5,
      completedDate: '3 days ago',
      totalSpent: '$21.45',
      collaborators: ['You', 'Sarah'],
      priority: 'medium',
      icon: '🥬'
    },
    {
      id: 102,
      name: 'Monthly Household',
      items: [
        { id: 1, name: 'Toilet Paper', completed: true, category: 'Household', price: '$12.99' },
        { id: 2, name: 'Dish Soap', completed: true, category: 'Cleaning', price: '$3.49' },
        { id: 3, name: 'Laundry Detergent', completed: true, category: 'Cleaning', price: '$8.99' },
        { id: 4, name: 'Paper Towels', completed: true, category: 'Household', price: '$6.99' },
      ],
      completed: 4,
      completedDate: '1 week ago',
      totalSpent: '$32.46',
      collaborators: ['You', 'Mike', 'Emma'],
      priority: 'low',
      icon: '🏠'
    },
    {
      id: 103,
      name: 'Birthday Party',
      items: [
        { id: 1, name: 'Birthday Cake', completed: true, category: 'Bakery', price: '$25.99' },
        { id: 2, name: 'Balloons', completed: true, category: 'Party', price: '$4.99' },
        { id: 3, name: 'Candles', completed: true, category: 'Party', price: '$2.99' },
        { id: 4, name: 'Ice Cream', completed: true, category: 'Frozen', price: '$7.99' },
        { id: 5, name: 'Party Plates', completed: true, category: 'Party', price: '$3.99' },
      ],
      completed: 5,
      completedDate: '2 weeks ago',
      totalSpent: '$45.95',
      collaborators: ['You', 'Sarah', 'Kids'],
      priority: 'high',
      icon: '🎉'
    }
  ]);

  // Generate unique IDs
  const generateListId = () => Math.max(...shoppingLists.map(l => l.id), 0) + 1;
  const generateItemId = (items) => Math.max(...items.map(i => i.id), 0) + 1;

  // Handle creating new list
  const handleCreateList = () => {
    if (!newListName.trim()) {
      showNotification('Please enter a list name', 'error');
      return;
    }

    const newList = {
      id: generateListId(),
      name: newListName.trim(),
      items: [],
      completed: 0,
      created: 'Just now',
      lastModified: 'Just now',
      collaborators: ['You'],
      priority: newListPriority,
      icon: newListIcon
    };

    setShoppingLists(prev => [newList, ...prev]);
    setNewListName('');
    setNewListIcon('🛒');
    setNewListPriority('medium');
    setShowCreateModal(false);
    showNotification(`Shopping list "${newList.name}" created successfully!`);
  };

  // Handle adding new item to a list
  const handleAddItem = () => {
    if (!newItemName.trim() || !selectedList) {
      showNotification('Please enter an item name', 'error');
      return;
    }

    const newItem = {
      id: generateItemId(selectedList.items),
      name: newItemName.trim(),
      completed: false,
      category: newItemCategory || 'Other'
    };

    setShoppingLists(prev => 
      prev.map(list => 
        list.id === selectedList.id 
          ? { ...list, items: [...list.items, newItem] }
          : list
      )
    );

    // Update selected list for real-time display
    setSelectedList(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    setNewItemName('');
    setNewItemCategory('');
    setShowAddItemModal(false);
    showNotification(`"${newItem.name}" added to ${selectedList.name}!`);
  };

  // Handle recreating list from previously bought
  const handleRecreateList = (previousList) => {
    const recreatedList = {
      id: generateListId(),
      name: `${previousList.name} (Recreated)`,
      items: previousList.items.map(item => ({
        ...item,
        id: generateItemId(previousList.items) + item.id,
        completed: false // Reset completion status
      })),
      completed: 0,
      created: 'Just now',
      lastModified: 'Just now',
      collaborators: ['You'],
      priority: previousList.priority,
      icon: previousList.icon
    };

    setShoppingLists(prev => [recreatedList, ...prev]);
    setShowPreviousBoughtModal(false);
    showNotification(`Shopping list "${recreatedList.name}" recreated successfully!`);
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        showNotification('Please upload a valid image (PNG, JPG) or PDF file', 'error');
        return;
      }

      setUploadedFile(file);
      showNotification('File uploaded! Processing receipt...', 'success');
      
      // Simulate receipt processing and create dummy list
      setTimeout(() => {
        processReceiptData();
      }, 2000);
    }
  };

  // Process dummy receipt data
  const processReceiptData = () => {
    const dummyReceiptItems = [
      { id: 1, name: 'Organic Milk 2%', completed: false, category: 'Dairy', price: '$4.99' },
      { id: 2, name: 'Whole Wheat Bread', completed: false, category: 'Bakery', price: '$3.49' },
      { id: 3, name: 'Bananas (1 lb)', completed: false, category: 'Fruits', price: '$1.29' },
      { id: 4, name: 'Greek Yogurt', completed: false, category: 'Dairy', price: '$5.99' },
      { id: 5, name: 'Chicken Breast', completed: false, category: 'Meat', price: '$8.99' },
      { id: 6, name: 'Brown Rice', completed: false, category: 'Grains', price: '$2.99' },
      { id: 7, name: 'Baby Spinach', completed: false, category: 'Vegetables', price: '$3.99' }
    ];

    const receiptList = {
      id: generateListId(),
      name: `Receipt Scan - ${new Date().toLocaleDateString()}`,
      items: dummyReceiptItems,
      completed: 0,
      created: 'Just now',
      lastModified: 'Just now',
      collaborators: ['You'],
      priority: 'medium',
      icon: '🧾'
    };

    setShoppingLists(prev => [receiptList, ...prev]);
    setUploadedFile(null);
    setShowScanModal(false);
    showNotification(`Receipt processed! Found ${dummyReceiptItems.length} items.`);
  };

  // Handle viewing list details
  const handleViewList = (list) => {
    setSelectedList(list);
    setShowListDetails(true);
  };

  // Toggle item completion in list details
  const toggleItemCompletion = (listId, itemId) => {
    setShoppingLists(prev => 
      prev.map(list => 
        list.id === listId 
          ? {
              ...list,
              items: list.items.map(item => 
                item.id === itemId 
                  ? { ...item, completed: !item.completed }
                  : item
              ),
              completed: list.items.filter(item => 
                item.id === itemId ? !item.completed : item.completed
              ).length
            }
          : list
      )
    );
    
    // Update selected list for real-time display
    if (selectedList && selectedList.id === listId) {
      setSelectedList(prev => ({
        ...prev,
        items: prev.items.map(item => 
          item.id === itemId 
            ? { ...item, completed: !item.completed }
            : item
        ),
        completed: prev.items.filter(item => 
          item.id === itemId ? !item.completed : item.completed
        ).length
      }));
    }
  };

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
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowScanModal(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <span>📷</span>
                <span>Scan Receipt</span>
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Create New List</span>
              </button>
              <button 
                onClick={() => setShowPreviousBoughtModal(true)}
                className="btn-secondary flex items-center space-x-2"
              >
                <span>📋</span>
                <span>Previous Lists</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Current Lists ({shoppingLists.length})
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'previous'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Previously Bought ({previouslyBoughtLists.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {activeTab === 'current' ? (
            <>
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">{shoppingLists.length}</div>
                <div className="text-sm text-gray-600">Active Lists</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {shoppingLists.reduce((total, list) => total + list.items.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {shoppingLists.reduce((total, list) => total + list.completed, 0)}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {[...new Set(shoppingLists.flatMap(list => list.collaborators))].length}
                </div>
                <div className="text-sm text-gray-600">Collaborators</div>
              </div>
            </>
          ) : (
            <>
              <div className="card text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{previouslyBoughtLists.length}</div>
                <div className="text-sm text-gray-600">Completed Lists</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {previouslyBoughtLists.reduce((total, list) => total + list.items.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Items Bought</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  ${previouslyBoughtLists.reduce((total, list) => total + parseFloat(list.totalSpent.replace('$', '')), 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  ${(previouslyBoughtLists.reduce((total, list) => total + parseFloat(list.totalSpent.replace('$', '')), 0) / previouslyBoughtLists.length).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Average Per List</div>
              </div>
            </>
          )}
        </div>

        {/* Shopping Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {activeTab === 'current' ? (
            <>
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
                      <span className="text-sm font-medium">{list.completed}/{list.items.length} items</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${list.items.length > 0 ? (list.completed / list.items.length) * 100 : 0}%` }}
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
                    <button 
                      onClick={() => handleViewList(list)}
                      className="btn-primary flex-1 text-sm"
                    >
                      View List
                    </button>
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
            </>
          ) : (
            <>
              {previouslyBoughtLists.map(list => (
                <div key={list.id} className={`card hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-l-4 border-green-200 bg-green-50`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{list.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{list.name}</h3>
                        <div className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ Completed
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋮
                    </button>
                  </div>

                  {/* Completion Info */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Items Bought</span>
                      <span className="text-sm font-medium">{list.completed} items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Spent</span>
                      <span className="text-sm font-bold text-green-600">{list.totalSpent}</span>
                    </div>
                  </div>

                  {/* Collaborators */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Collaborators</div>
                    <div className="flex items-center space-x-1">
                      {list.collaborators.slice(0, 3).map((collaborator, index) => (
                        <div key={index} className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
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
                    <div>Completed {list.completedDate}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewList(list)}
                      className="btn-secondary flex-1 text-sm"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleRecreateList(list)}
                      className="btn-primary text-sm px-3"
                    >
                      🔄 Recreate
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
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
                List Name *
              </label>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Enter list name..."
                className="input-field"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <div className="flex space-x-2 flex-wrap gap-2">
                {['🛒', '🥬', '🍎', '🥖', '🧀', '🥩', '🍕', '🎂', '🧽', '🏠'].map(icon => (
                  <button
                    key={icon}
                    onClick={() => setNewListIcon(icon)}
                    className={`w-10 h-10 rounded-lg border-2 text-lg hover:bg-gray-100 transition-colors ${
                      newListIcon === icon ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select 
                value={newListPriority}
                onChange={(e) => setNewListPriority(e.target.value)}
                className="input-field"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setNewListName('');
                  setNewListIcon('🛒');
                  setNewListPriority('medium');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateList}
                className="btn-primary"
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Scanning Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">📷 Scan Receipt</h3>
            <p className="text-gray-600 mb-6">
              Upload a photo of your receipt or a PDF to automatically create a shopping list from your previous purchases.
            </p>
            
            <div className="mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="receipt-upload"
                />
                <label htmlFor="receipt-upload" className="cursor-pointer">
                  <div className="text-4xl mb-3">📄</div>
                  <p className="text-gray-600 mb-2">Click to upload receipt</p>
                  <p className="text-sm text-gray-500">Supports: JPG, PNG, PDF</p>
                </label>
              </div>
              
              {uploadedFile && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-500">📎</span>
                    <span className="text-sm font-medium text-blue-800">{uploadedFile.name}</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Processing receipt...</p>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <span className="text-yellow-600">💡</span>
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Tips for better results:</p>
                  <ul className="mt-1 list-disc list-inside space-y-1">
                    <li>Ensure the receipt is clearly visible</li>
                    <li>Good lighting and focus</li>
                    <li>All text should be readable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowScanModal(false);
                  setUploadedFile(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Details Modal */}
      {showListDetails && selectedList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedList.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{selectedList.name}</h3>
                  <p className="text-gray-600">
                    {selectedList.completed}/{selectedList.items.length} items completed
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowListDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-500 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${selectedList.items.length > 0 ? (selectedList.completed / selectedList.items.length) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3 mb-6">
              {selectedList.items.length > 0 ? (
                selectedList.items.map(item => (
                  <div 
                    key={item.id} 
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      item.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItemCompletion(selectedList.id, item.id)}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {item.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        {item.price && (
                          <span className="text-xs text-green-600 font-medium">
                            {item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No items in this list yet</p>
                  <button 
                    onClick={() => setShowAddItemModal(true)}
                    className="btn-primary mt-4"
                  >
                    Add Items
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddItemModal(true)}
                className="btn-primary flex-1"
              >
                Add Items
              </button>
              <button className="btn-secondary">Share List</button>
              <button 
                onClick={() => setShowListDetails(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && selectedList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Item to {selectedList.name}</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter item name..."
                className="input-field"
                autoFocus
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select 
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="input-field"
              >
                <option value="">Select category...</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Bakery">Bakery</option>
                <option value="Grains">Grains</option>
                <option value="Snacks">Snacks</option>
                <option value="Beverages">Beverages</option>
                <option value="Household">Household</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => {
                  setShowAddItemModal(false);
                  setNewItemName('');
                  setNewItemCategory('');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddItem}
                className="btn-primary"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Previously Bought Lists Modal */}
      {showPreviousBoughtModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Previously Bought Lists</h3>
              <button 
                onClick={() => setShowPreviousBoughtModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previouslyBoughtLists.map(list => (
                <div key={list.id} className="card border-l-4 border-green-200 bg-green-50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{list.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-800">{list.name}</h4>
                        <p className="text-sm text-gray-600">Completed {list.completedDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Items Bought</span>
                      <span className="text-sm font-medium">{list.completed} items</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Spent</span>
                      <span className="text-sm font-bold text-green-600">{list.totalSpent}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Items:</p>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {list.items.slice(0, 3).map(item => (
                        <div key={item.id} className="text-xs text-gray-600 flex justify-between">
                          <span>{item.name}</span>
                          <span className="text-green-600">{item.price}</span>
                        </div>
                      ))}
                      {list.items.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{list.items.length - 3} more items...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewList(list)}
                      className="btn-secondary flex-1 text-sm"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleRecreateList(list)}
                      className="btn-primary text-sm px-3"
                    >
                      🔄 Recreate
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowPreviousBoughtModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center space-x-2">
            <span>{notification.type === 'success' ? '✅' : '❌'}</span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingLists;
