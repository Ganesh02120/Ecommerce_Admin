import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiEdit2, FiCamera, FiSave, FiX, FiShoppingBag, FiDollarSign, FiPackage, FiTruck, FiCreditCard, FiPieChart, FiTag, FiBox, FiLayers, FiLock } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [userData, setUserData] = useState({
    name: 'John Smith',
    email: 'admin@ecommercestore.com',
    phone: '+1 555 123 4567',
    role: 'E-commerce Manager',
    joinDate: 'January 2023',
    lastActive: '2 minutes ago'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [ecomStats] = useState({
    totalOrders: 5678,
    totalRevenue: 1250000,
    activeProducts: 450,
    pendingOrders: 23,
    conversionRate: 3.2,
    avgOrderValue: 220
  });

  const [recentActivity] = useState([
    { id: 1, title: 'New Order Processed', description: 'Processed order #12345 worth $2,500', time: '2 minutes ago', icon: FiShoppingBag },
    { id: 2, title: 'Product Update', description: 'Updated inventory for "Premium Headphones"', time: '1 hour ago', icon: FiPackage },
    { id: 3, title: 'Discount Campaign', description: 'Created summer sale discount campaign', time: '3 hours ago', icon: FiTag },
    { id: 4, title: 'Shipment Sent', description: 'Shipped 15 orders to customers', time: '1 day ago', icon: FiTruck }
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePasswordForm = () => {
    let valid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      valid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      valid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setPasswordErrors(newErrors);
    return valid;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      // Here you would typically make an API call to change the password
      alert('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  return (
    <div className="ml-60 bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-100 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                {isEditing && (
                  <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FiCamera className="w-8 h-8 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="text-2xl font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{userData.role}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Joined {userData.joinDate}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FiSave className="w-5 h-5" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setShowPasswordForm(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FiEdit2 className="w-5 h-5" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMail className="w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    />
                  ) : (
                    <span>{userData.email}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiPhone className="w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    />
                  ) : (
                    <span>{userData.phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiShoppingBag className="w-5 h-5" />
                  <span>Last active: {userData.lastActive}</span>
                </div>
              </div>

              {/* Password Change Form (visible only in edit mode) */}
              {isEditing && (
                <div className="mt-6">
                  {!showPasswordForm ? (
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FiLock className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                  ) : (
                    <form onSubmit={handlePasswordSubmit} className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800 mb-3">Change Password</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          {passwordErrors.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          {passwordErrors.newPassword && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          {passwordErrors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                          )}
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Update Password
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowPasswordForm(false)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of your existing code remains the same */}
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - E-commerce Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Cards */}
            <div className="bg-gray-100 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Store Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiShoppingBag className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-xl font-semibold text-gray-800">{ecomStats.totalOrders}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FiDollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-xl font-semibold text-gray-800">${(ecomStats.totalRevenue / 1000).toFixed(1)}k</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <FiPackage className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Products</p>
                      <p className="text-xl font-semibold text-gray-800">{ecomStats.activeProducts}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <FiPieChart className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Conversion</p>
                      <p className="text-xl font-semibold text-gray-800">{ecomStats.conversionRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-100 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiTag className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Create Discount</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiBox className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Add New Product</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiTruck className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Process Shipments</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Timeline */}
            <div className="bg-gray-100 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* E-commerce Controls */}
            <div className="bg-gray-100 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Store Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiPackage className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Product Catalog</p>
                    <p className="text-sm text-gray-600">Manage products and inventory</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FiShoppingBag className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Order Management</p>
                    <p className="text-sm text-gray-600">View and process orders</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FiTag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Promotions</p>
                    <p className="text-sm text-gray-600">Create discounts and deals</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FiPieChart className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">Analytics</p>
                    <p className="text-sm text-gray-600">View sales and performance</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;