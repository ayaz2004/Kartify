import React, { useState } from 'react';

const FamilyDashboard = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const familyMembers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'admin',
      avatar: '👨',
      joinedDate: 'January 2025',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'member',
      avatar: '👩',
      joinedDate: 'January 2025',
      status: 'active'
    },
    {
      id: 3,
      name: 'Alex Smith',
      email: 'alex@example.com',
      role: 'member',
      avatar: '🧑',
      joinedDate: 'January 2025',
      status: 'pending'
    }
  ];

  const familyStats = {
    totalMembers: 3,
    activeMembers: 2,
    pendingInvites: 1,
    sharedLists: 5,
    totalSavings: 847
  };

  const handleInvite = (e) => {
    e.preventDefault();
    // Handle invite logic here
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Family Dashboard
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Manage your family group, invite members, and coordinate your shopping together.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl">👨‍👩‍👧‍👦</span>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Smith Family</h2>
              <p className="text-gray-600">Manage your family group and shopping coordination</p>
            </div>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <span>👥</span>
              <span>Invite Family Member</span>
            </button>
          </div>
        </div>

        {/* Family Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="stat-card">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
              <span className="text-white text-xl">👥</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{familyStats.totalMembers}</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
          <div className="stat-card">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
              <span className="text-white text-xl">✅</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{familyStats.activeMembers}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="stat-card">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
              <span className="text-white text-xl">⏳</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{familyStats.pendingInvites}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="stat-card">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
              <span className="text-white text-xl">📋</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{familyStats.sharedLists}</div>
            <div className="text-sm text-gray-600">Shared Lists</div>
          </div>
          <div className="stat-card">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
              <span className="text-white text-xl">💰</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">${familyStats.totalSavings}</div>
            <div className="text-sm text-gray-600">Total Savings</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Family Members */}
          <div className="lg:col-span-2">
            <div className="card-modern">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-2">👥</span>
                  Family Members
                </h3>
                <button 
                  onClick={() => setShowInviteModal(true)}
                  className="btn-secondary text-sm"
                >
                  Add Member
                </button>
              </div>

              <div className="space-y-4">
                {familyMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.role === 'admin' 
                              ? 'bg-primary-100 text-primary-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {member.role}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {member.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Joined {member.joinedDate}</p>
                      <button className="text-gray-400 hover:text-gray-600 mt-1">
                        ⋮
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Family Settings */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Family Settings Card */}
              <div className="card-modern">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">⚙️</span>
                  Family Settings
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3">
                    <span>👥</span>
                    <span className="font-medium">Manage Permissions</span>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3">
                    <span>🔔</span>
                    <span className="font-medium">Notification Settings</span>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3">
                    <span>📊</span>
                    <span className="font-medium">Spending Limits</span>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center space-x-3">
                    <span>🎯</span>
                    <span className="font-medium">Shopping Goals</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card-modern">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      S
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Sarah added 3 items</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      J
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">John completed grocery list</p>
                      <p className="text-xs text-gray-600">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">
                      A
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Alex invitation pending</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Invite Family Member</h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleInvite}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="input-field"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select className="input-field">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">
                  Send Invitation
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowInviteModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyDashboard;
