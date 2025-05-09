import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEye, FiEdit, FiTrash2, FiChevronDown, FiChevronUp, FiDownload, FiCalendar, FiPackage, FiUser, FiMapPin, FiClock, FiDollarSign, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const ordersPerPage = 5;

    // Sample orders data - replace with actual data from your backend
    const orders = [
        {
            id: 'ORD-001',
            date: '2024-03-15',
            time: '14:30',
            customer: {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1 234 567 890',
                address: '123 Main St, City, Country'
            },
            delivery: {
                address: '123 Main St, City, Country',
                method: 'Express Shipping',
                tracking: 'TRK123456789'
            },
            status: 'Delivered',
            total: 299.99,
            payment: {
                method: 'Credit Card',
                status: 'Paid',
                transactionId: 'TXN123456'
            },
            items: [
                { name: 'Wireless Headphones', quantity: 1, price: 199.99, image: 'https://via.placeholder.com/50' },
                { name: 'Phone Case', quantity: 2, price: 50.00, image: 'https://via.placeholder.com/50' }
            ]
        },
        {
            id: 'ORD-002',
            date: '2024-03-14',
            customer: {
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '+1 234 567 891'
            },
            delivery: {
                address: '456 Oak St, City, Country',
                method: 'Standard Shipping'
            },
            status: 'Processing',
            total: 149.99,
            items: [
                { name: 'Smart Watch', quantity: 1, price: 149.99 }
            ]
        },
        // Add more sample orders as needed
    ];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-purple-100 text-purple-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setExpandedOrder(null);
    };

    // Order View Modal Component
    const OrderViewModal = ({ order, onClose }) => {
        if (!order) return null;

        return (
            <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                <FiPackage className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                                <p className="text-gray-600">#{order.id}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FiX size={24} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-6 space-y-8">
                            {/* Order Status and Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-100 rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <FiClock className="text-blue-600" size={20} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800">Order Information</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Order Date</p>
                                            <p className="font-medium text-gray-800">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Order Time</p>
                                            <p className="font-medium text-gray-800">{order.time}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-green-50 rounded-lg">
                                            <FiUser className="text-green-600" size={20} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800">Customer Details</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium text-gray-800">{order.customer.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium text-gray-800">{order.customer.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-800">{order.customer.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-purple-50 rounded-lg">
                                            <FiDollarSign className="text-purple-600" size={20} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800">Payment Information</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Method</p>
                                            <p className="font-medium text-gray-800">{order.payment.method}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Transaction ID</p>
                                            <p className="font-medium text-gray-800">{order.payment.transactionId}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                {order.payment.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-orange-50 rounded-lg">
                                        <FiMapPin className="text-orange-600" size={20} />
                                    </div>
                                    <h3 className="font-semibold text-gray-800">Delivery Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Shipping Address</p>
                                        <p className="font-medium text-gray-800">{order.delivery.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">Shipping Method</p>
                                        <p className="font-medium text-gray-800">{order.delivery.method}</p>
                                        <p className="text-sm text-gray-500 mt-1">Tracking: {order.delivery.tracking}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-gray-100 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-indigo-50 rounded-lg">
                                            <FiPackage className="text-indigo-600" size={20} />
                                        </div>
                                        <h3 className="font-semibold text-gray-800">Order Items</h3>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="p-6 hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-800">{item.name}</p>
                                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-800">${item.price.toFixed(2)}</p>
                                                    <p className="text-sm text-gray-500">Total: ${(item.quantity * item.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 bg-gray-100 border-t border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                                        <span className="text-2xl font-bold text-gray-800">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 bg-gray-100 flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-white transition-colors font-medium"
                        >
                            Close
                        </button>
                        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
                            <FiDownload size={18} />
                            <span>Download Invoice</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="ml-64 p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                    <p className="text-gray-600">Manage and track all your orders</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                        <FiCalendar className="text-gray-400" />
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                        <FiDownload size={18} />
                        <span>Export Orders</span>
                    </button>
                </div>
            </div>

            {/* Combined Container for Search, Filter, and Table */}
            <div className="bg-gray-100 rounded-xl  border border-gray-100 overflow-hidden">
                {/* Search and Filter Bar */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Box */}
                        <div className="flex-1">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search orders by ID, customer name, or email..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="w-full md:w-64">
                            <div className="relative">
                                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order Number</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Delivery</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-100 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-800">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-800">{order.customer.name}</p>
                                            <p className="text-sm text-gray-500">{order.customer.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-gray-600">{order.delivery.method}</p>
                                            <p className="text-sm text-gray-500 truncate max-w-xs">{order.delivery.address}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                title="View Details"
                                            >
                                                <FiEye size={18} />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800 transition-colors" title="Edit Order">
                                                <FiEdit size={18} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 transition-colors" title="Delete Order">
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border ${currentPage === 1
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg border ${currentPage === totalPages
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Order View Modal */}
            {selectedOrder && (
                <OrderViewModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
};

export default Orders; 