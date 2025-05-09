import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminStoresTable = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);

    const statuses = ['All', 'Active', 'Inactive', 'Pending'];

    useEffect(() => {
        setTimeout(() => {
            setStores([
                {
                    id: 1,
                    name: 'Electronics Store',
                    owner: 'John Doe',
                    email: 'john@example.com',
                    phone: '123-456-7890',
                    address: '123 Main St, City, Country',
                    status: 'Active',
                },
                {
                    id: 2,
                    name: 'Fashion Store',
                    owner: 'Jane Smith',
                    email: 'jane@example.com',
                    phone: '098-765-4321',
                    address: '456 Oak St, City, Country',
                    status: 'Inactive',
                },
                {
                    id: 3,
                    name: 'Home Goods Store',
                    owner: 'Alice Johnson',
                    email: 'alice@example.com',
                    phone: '555-123-4567',
                    address: '789 Pine St, City, Country',
                    status: 'Pending',
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const filteredStores = stores.filter((store) => {
        const matchesSearch =
            store.name.toLowerCase().includes(search.toLowerCase()) ||
            store.owner.toLowerCase().includes(search.toLowerCase()) ||
            store.email.toLowerCase().includes(search.toLowerCase()) ||
            store.phone.toLowerCase().includes(search.toLowerCase()) ||
            store.address.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'All' || store.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="ml-60 bg-gray-100 min-h-screen flex flex-col">
            <div className="w-full">
                {/* Card Header */}
                <div className="bg-white rounded-none shadow px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Stores</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage your stores</p>
                    </div>
                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search stores by name, owner, email, phone, address..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-gray-50"
                            />
                        </div>
                        <div className="relative flex-1 md:w-52">
                            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-gray-50"
                            >
                                {statuses.map((status) => (
                                    <option key={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-none shadow px-2 pb-2 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Store</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Owner</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td>
                                </tr>
                            ) : filteredStores.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-8 text-gray-400">No stores found</td>
                                </tr>
                            ) : (
                                filteredStores.map((store) => (
                                    <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">{store.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{store.owner}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{store.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{store.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{store.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${store.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                    store.status === 'Inactive' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {store.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => {
                                                    setSelectedStore(store);
                                                    setShowDeleteModal(true);
                                                }}
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

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h3 className="text-lg font-semibold mb-2">Delete Store</h3>
                            <p className="mb-4 text-gray-600">
                                Are you sure you want to delete <span className="font-bold">{selectedStore?.name}</span>?
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() => {
                                        setStores(stores.filter((s) => s.id !== selectedStore.id));
                                        setShowDeleteModal(false);
                                        toast.success('Store deleted');
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStoresTable; 