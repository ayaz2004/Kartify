import React, { useState } from 'react';

const FamilyDashboard = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [inviteName, setInviteName] = useState('');
  const [notification, setNotification] = useState(null);
  
  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };
  
  // Family members state - now manageable
  const [familyMembers, setFamilyMembers] = useState([
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
  ]);

  // Recent activity state
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      user: 'Sarah',
      avatar: 'S',
      action: 'added 3 items',
      time: '2 hours ago',
      type: 'add'
    },
    {
      id: 2,
      user: 'John',
      avatar: 'J',
      action: 'completed grocery list',
      time: '5 hours ago',
      type: 'complete'
    },
    {
      id: 3,
      user: 'Alex',
      avatar: 'A',
      action: 'invitation pending',
      time: '1 day ago',
      type: 'pending'
    }
  ]);

  // Add activity helper
  const addActivity = (user, action, type = 'general') => {
    const newActivity = {
      id: Date.now(),
      user,
      avatar: user.charAt(0).toUpperCase(),
      action,
      time: 'Just now',
      type
    };
    setRecentActivity(prev => [newActivity, ...prev.slice(0, 4)]); // Keep only 5 most recent
  };

  // Dynamic family stats based on current members
  const familyStats = {
    totalMembers: familyMembers.length,
    activeMembers: familyMembers.filter(member => member.status === 'active').length,
    pendingInvites: familyMembers.filter(member => member.status === 'pending').length,
    sharedLists: 5,
    totalSavings: 847
  };

  // Generate random avatar
  const getRandomAvatar = () => {
    const avatars = ['👨', '👩', '🧑', '👦', '👧', '🧓', '👴', '👵'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  // Generate member ID
  const generateMemberId = () => {
    return Math.max(...familyMembers.map(m => m.id)) + 1;
  };

  const handleInvite = (e) => {
    e.preventDefault();
    
    if (!inviteName.trim() || !inviteEmail.trim()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Check if email already exists
    if (familyMembers.some(member => member.email === inviteEmail)) {
      showNotification('This email is already invited to the family', 'error');
      return;
    }

    // Create new member
    const newMember = {
      id: generateMemberId(),
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      avatar: getRandomAvatar(),
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      status: 'pending'
    };

    // Add to family members
    setFamilyMembers(prev => [...prev, newMember]);
    
    // Add activity
    addActivity(newMember.name, 'was invited to the family', 'invite');
    
    // Reset form
    setInviteName('');
    setInviteEmail('');
    setInviteRole('member');
    setShowInviteModal(false);
    
    // Show success message
    showNotification(`Invitation sent to ${newMember.name}`);
  };

  // Handle member actions
  const handleMemberAction = (memberId, action) => {
    const member = familyMembers.find(m => m.id === memberId);
    
    if (action === 'remove') {
      if (window.confirm(`Are you sure you want to remove ${member.name} from the family?`)) {
        setFamilyMembers(prev => prev.filter(member => member.id !== memberId));
        addActivity(member.name, 'was removed from the family', 'remove');
        showNotification(`${member.name} has been removed from the family`);
      }
    } else if (action === 'activate') {
      setFamilyMembers(prev => 
        prev.map(member => 
          member.id === memberId 
            ? { ...member, status: 'active' }
            : member
        )
      );
      addActivity(member.name, 'joined the family', 'activate');
      showNotification(`${member.name} is now an active family member`);
    } else if (action === 'makeAdmin') {
      if (window.confirm(`Make ${member.name} a family admin? They will be able to manage family settings and invite members.`)) {
        setFamilyMembers(prev => 
          prev.map(member => 
            member.id === memberId 
              ? { ...member, role: 'admin' }
              : member
          )
        );
        addActivity(member.name, 'was promoted to admin', 'promote');
        showNotification(`${member.name} is now a family admin`);
      }
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
                    <div className="flex items-center space-x-2">
                      <div className="text-right mr-3">
                        <p className="text-sm text-gray-600">Joined {member.joinedDate}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-1">
                        {member.status === 'pending' && (
                          <button 
                            onClick={() => handleMemberAction(member.id, 'activate')}
                            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                            title="Activate Member"
                          >
                            ✓
                          </button>
                        )}
                        {member.role !== 'admin' && (
                          <button 
                            onClick={() => handleMemberAction(member.id, 'makeAdmin')}
                            className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                            title="Make Admin"
                          >
                            👑
                          </button>
                        )}
                        <button 
                          onClick={() => handleMemberAction(member.id, 'remove')}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          title="Remove Member"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {familyMembers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No family members yet</p>
                    <button 
                      onClick={() => setShowInviteModal(true)}
                      className="btn-primary"
                    >
                      Invite First Member
                    </button>
                  </div>
                )}
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
                  {recentActivity.map((activity) => {
                    const getActivityColor = (type) => {
                      switch(type) {
                        case 'invite': return 'bg-purple-50';
                        case 'activate': return 'bg-green-50';
                        case 'promote': return 'bg-blue-50';
                        case 'remove': return 'bg-red-50';
                        case 'complete': return 'bg-green-50';
                        case 'add': return 'bg-blue-50';
                        default: return 'bg-gray-50';
                      }
                    };
                    
                    const getAvatarColor = (type) => {
                      switch(type) {
                        case 'invite': return 'bg-purple-500';
                        case 'activate': return 'bg-green-500';
                        case 'promote': return 'bg-blue-500';
                        case 'remove': return 'bg-red-500';
                        case 'complete': return 'bg-green-500';
                        case 'add': return 'bg-blue-500';
                        default: return 'bg-gray-500';
                      }
                    };
                    
                    return (
                      <div key={activity.id} className={`flex items-center space-x-3 p-3 ${getActivityColor(activity.type)} rounded-lg`}>
                        <div className={`w-8 h-8 ${getAvatarColor(activity.type)} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                          {activity.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.user} {activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {recentActivity.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">No recent activity</p>
                    </div>
                  )}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="input-field"
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
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
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="input-field"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Admins can manage family settings and invite other members
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">
                  Send Invitation
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteName('');
                    setInviteEmail('');
                    setInviteRole('member');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
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

export default FamilyDashboard;
