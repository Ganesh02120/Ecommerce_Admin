import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiCheckCircle, FiXCircle, FiMapPin, FiFilter, FiX, FiPlus, FiUpload, FiImage, FiMail, FiPhone, FiMap, FiGlobe, FiAlertTriangle } from 'react-icons/fi';

const initialStores = [
  {
    id: 1,
    logo: 'https://logo.clearbit.com/shopify.com',
    name: 'Shopify Store',
    email: 'alice@shopify.com',
    address: '123 Commerce St, New York, NY',
    status: 'Active',
  },
  {
    id: 2,
    logo: 'https://logo.clearbit.com/etsy.com',
    name: 'Etsy Boutique',
    email: 'bob@etsy.com',
    address: '456 Handmade Ave, Austin, TX',
    status: 'Inactive',
  },
  {
    id: 3,
    logo: 'https://logo.clearbit.com/amazon.com',
    name: 'Amazon MegaStore',
    email: 'carol@amazon.com',
    address: '789 Prime Rd, Seattle, WA',
    status: 'Active',
  },
  {
    id: 4,
    logo: 'https://logo.clearbit.com/flipkart.com',
    name: 'Flipkart Mart',
    email: 'david@flipkart.com',
    address: '321 Market St, San Francisco, CA',
    status: 'Active',
  },
  {
    id: 5,
    logo: 'https://logo.clearbit.com/ebay.com',
    name: 'eBay Deals',
    email: 'eve@ebay.com',
    address: '654 Auction Blvd, Los Angeles, CA',
    status: 'Inactive',
  },
];

const statuses = ['All', 'Active', 'Inactive'];

const Stores = () => {
  const [stores, setStores] = useState(initialStores);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [newStore, setNewStore] = useState({
    name: '',
    email: '',
    address: '',
    status: 'Active',
    logo: ''
  });
  const [logoPreview, setLogoPreview] = useState(null);

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.email.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setNewStore(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storeToAdd = {
      ...newStore,
      id: stores.length + 1
    };
    setStores(prev => [...prev, storeToAdd]);
    setShowAddModal(false);
    setNewStore({
      name: '',
      email: '',
      address: '',
      status: 'Active',
      logo: ''
    });
    setLogoPreview(null);
  };

  const handleEdit = (store) => {
    setSelectedStore(store);
    setNewStore({
      name: store.name,
      email: store.email,
      address: store.address,
      status: store.status,
      logo: store.logo
    });
    setLogoPreview(store.logo);
    setShowEditModal(true);
  };

  const handleDelete = (store) => {
    setSelectedStore(store);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStores(prev => prev.map(store =>
      store.id === selectedStore.id ? { ...store, ...newStore } : store
    ));
    setShowEditModal(false);
    setSelectedStore(null);
    setNewStore({
      name: '',
      email: '',
      address: '',
      status: 'Active',
      logo: ''
    });
    setLogoPreview(null);
  };

  const handleDeleteConfirm = () => {
    setStores(prev => prev.filter(store => store.id !== selectedStore.id));
    setShowDeleteModal(false);
    setSelectedStore(null);
  };

  return (
    <div className="ml-60 bg-gray-100 min-h-screen flex flex-col overflow-x-hidden ">
      <div className="w-full">
        <div className="bg-gray-100 rounded-none  p-6 ">
          {/* Header with Add Store Button */}
          <div className="flex justify-between items-center mb-6 ">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Stores</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your stores</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <FiPlus className="w-5 h-5" />
              Add Store
            </button>
          </div>

          <div className="mb-6 bg-gray-100 p-4 rounded-lg border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Stores</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <div className="relative">
                  <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {(search || statusFilter !== 'All') && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      <FiX className="text-gray-400" />
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <table className="w-full table-auto divide-y divide-gray-100">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Logo</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Store Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStores.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-400">No stores found</td>
                    </tr>
                  ) : (
                    filteredStores.map((store) => (
                      <tr key={store.id} className="hover:bg-gray-100 transition-colors">
                        <td className="px-6 py-4">
                          <img src={store.logo} alt={store.name} className="w-10 h-10 rounded object-cover border" />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">{store.name}</td>
                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{store.email}</td>
                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap flex items-center gap-2"><FiMapPin className="text-gray-400" />{store.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {store.status === 'Active' ? (
                            <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-semibold"><FiCheckCircle /> Active</span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded text-xs font-semibold"><FiXCircle /> Inactive</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(store)}
                            className="text-blue-600 hover:text-blue-900 mr-3 transition-colors p-2 hover:bg-blue-50 rounded-full"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(store)}
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
          </div>
        </div>
      </div>

      {/* Enhanced Add Store Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl transform transition-all duration-300 animate-slideIn">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Add New Store</h3>
                <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new store</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32 group">
                      <div className={`w-full h-full border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden transition-all duration-200 ${logoPreview ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                        {logoPreview ? (
                          <>
                            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setLogoPreview(null);
                                  setNewStore(prev => ({ ...prev, logo: '' }));
                                }}
                                className="text-white hover:text-red-400 transition-colors"
                              >
                                <FiX className="w-6 h-6" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <FiImage className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm"
                      >
                        <FiUpload className="w-5 h-5" />
                        Upload Logo
                      </label>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Store Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={newStore.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter store name"
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
                      value={newStore.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={newStore.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FiMap className="text-gray-400" />
                    </div>
                    <textarea
                      name="address"
                      value={newStore.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 resize-none"
                      placeholder="Enter store address"
                      required
                    ></textarea>
                  </div>
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
                  Add Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Store Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl transform transition-all duration-300 animate-slideIn">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Edit Store</h3>
                <p className="text-sm text-gray-500 mt-1">Update store information</p>
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
                {/* Logo Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32 group">
                      <div className={`w-full h-full border-2 border-dashed rounded-xl flex items-center justify-center overflow-hidden transition-all duration-200 ${logoPreview ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                        {logoPreview ? (
                          <>
                            <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setLogoPreview(null);
                                  setNewStore(prev => ({ ...prev, logo: '' }));
                                }}
                                className="text-white hover:text-red-400 transition-colors"
                              >
                                <FiX className="w-6 h-6" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <FiImage className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm"
                      >
                        <FiUpload className="w-5 h-5" />
                        Upload Logo
                      </label>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Store Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={newStore.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter store name"
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
                      value={newStore.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={newStore.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FiMap className="text-gray-400" />
                    </div>
                    <textarea
                      name="address"
                      value={newStore.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 resize-none"
                      placeholder="Enter store address"
                      required
                    ></textarea>
                  </div>
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
                  Update Store
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
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">Delete Store</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete "{selectedStore?.name}"? This action cannot be undone.
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
                  Delete Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;

// Add these styles to your global CSS file or create a new style block
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
`;
