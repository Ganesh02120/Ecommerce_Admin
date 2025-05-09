import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiUser, FiMail, FiPhone, FiCheckCircle, FiXCircle, FiChevronDown, FiPlus, FiUpload, FiImage, FiAlertTriangle, FiClock, FiX } from 'react-icons/fi';

const initialUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 555 123 4567',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 555 987 6543',
    role: 'User',
    status: 'Inactive',
    lastActive: '1 hour ago'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1 555 222 3333',
    role: 'Moderator',
    status: 'Active',
    lastActive: '5 minutes ago'
  },
  {
    id: 4,
    name: 'Emily Clark',
    email: 'emily.clark@example.com',
    phone: '+1 555 444 5555',
    role: 'User',
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.lee@example.com',
    phone: '+1 555 666 7777',
    role: 'User',
    status: 'Inactive',
    lastActive: '2 days ago'
  },
];

const roles = ['All', 'Admin', 'Moderator', 'User'];
const statuses = ['All', 'Active', 'Inactive'];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User',
    status: 'Active',
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setNewUser(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const userToAdd = {
      ...newUser,
      id: users.length + 1,
      lastActive: 'Just now'
    };
    setUsers(prev => [...prev, userToAdd]);
    setShowAddModal(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active',
    });
    setAvatarPreview(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setAvatarPreview(user.avatar);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUsers(prev => prev.map(user =>
      user.id === selectedUser.id ? { ...user, ...newUser } : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active',
    });
    setAvatarPreview(null);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="ml-60 bg-gray-100 h-screen flex flex-col overflow-hidden">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Users</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your users</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <FiPlus className="w-5 h-5" />
            Add User
          </button>
        </div>

        <div className="bg-gray-100 rounded-lg border border-gray-100 flex-1 flex flex-col min-h-0">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white"
                  />
                </div>
              </div>
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Role</label>
                <div className="relative">
                  {/* <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="pl-4 pr-10 py-2 w-full border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white"
                  >
                    {roles.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <div className="relative">
                  {/* <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-4 pr-10 py-2 w-full border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <table className="w-full divide-y divide-gray-100 table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/6">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/6">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/6">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/6">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/6">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/6">Last Active</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-400">No users found</td>
                  </tr>
                ) : (
                  currentItems.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900 truncate">{user.name}</td>
                      <td className="px-6 py-4 text-gray-700 truncate">{user.email}</td>
                      <td className="px-6 py-4 text-gray-700 truncate">{user.phone}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'Admin' ? 'bg-blue-100 text-blue-700' : user.role === 'Moderator' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{user.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        {user.status === 'Active' ? (
                          <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-semibold"><FiCheckCircle /> Active</span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-semibold"><FiXCircle /> Inactive</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500 flex items-center gap-1 truncate">
                        <FiClock className="text-gray-400 flex-shrink-0" />
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-900 mr-3 transition-colors p-2 hover:bg-blue-50 rounded-full"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-red-600 hover:text-red-900 transition-colors p-2 hover:bg-red-50 rounded-full"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-white">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-100 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-100 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredUsers.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredUsers.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-100 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-100 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl transform transition-all duration-300 animate-slideIn">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Add New User</h3>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new user</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 bg-white"
                  >
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={newUser.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl transform transition-all duration-300 animate-slideIn">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Edit User</h3>
                <p className="text-sm text-gray-500 mt-1">Update user information</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 bg-white"
                  >
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={newUser.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 shadow-2xl transform transition-all duration-300 animate-slideIn">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <FiAlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Delete User</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete "{selectedUser?.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
