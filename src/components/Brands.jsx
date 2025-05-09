import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiUpload, FiDownload, FiMoreVertical } from 'react-icons/fi';

const Brands = () => {
    const [brands, setBrands] = useState([
        {
            id: 1,
            name: 'Nike',
            logo: 'https://example.com/nike-logo.png',
            status: 'Active',
            products: 156,
            createdAt: '2024-01-15',
            description: 'Just Do It',
            website: 'https://nike.com',
            socialMedia: {
                facebook: 'nike',
                instagram: 'nike',
                twitter: 'nike'
            }
        },
        {
            id: 2,
            name: 'Adidas',
            logo: 'https://example.com/adidas-logo.png',
            status: 'Active',
            products: 143,
            createdAt: '2024-01-16',
            description: 'Impossible Is Nothing',
            website: 'https://adidas.com',
            socialMedia: {
                facebook: 'adidas',
                instagram: 'adidas',
                twitter: 'adidas'
            }
        },
        // Add more brands as needed
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [showActions, setShowActions] = useState(null);

    const [newBrand, setNewBrand] = useState({
        name: '',
        logo: '',
        status: 'Active',
        description: '',
        website: '',
        socialMedia: {
            facebook: '',
            instagram: '',
            twitter: ''
        }
    });

    const handleAddBrand = () => {
        const brand = {
            id: Date.now(),
            ...newBrand,
            products: 0,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setBrands([...brands, brand]);
        setShowAddModal(false);
        setNewBrand({
            name: '',
            logo: '',
            status: 'Active',
            description: '',
            website: '',
            socialMedia: {
                facebook: '',
                instagram: '',
                twitter: ''
            }
        });
    };

    const handleDeleteBrand = (id) => {
        setBrands(brands.filter(brand => brand.id !== id));
    };

    const handleEditBrand = (brand) => {
        setSelectedBrand(brand);
        setShowAddModal(true);
    };

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="ml-60 bg-gray-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Brands</h2>
                            <p className="text-gray-600">Manage your product brands</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                            >
                                <FiFilter />
                                <span>Filters</span>
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                <FiPlus />
                                <span>Add Brand</span>
                            </button>
                        </div>
                    </div>

                    {/* Search and Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="col-span-2">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search brands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                />
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="text-sm text-blue-600 font-medium">Total Brands</div>
                            <div className="text-2xl font-bold text-blue-700">{brands.length}</div>
                        </div>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300">
                                        <option value="">All</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300">
                                        <option value="name">Name</option>
                                        <option value="products">Products</option>
                                        <option value="date">Date</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300">
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Products Range</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300">
                                        <option value="">All</option>
                                        <option value="0-50">0-50</option>
                                        <option value="51-100">51-100</option>
                                        <option value="101+">101+</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBrands.map((brand) => (
                        <div key={brand.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${brand.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {brand.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowActions(showActions === brand.id ? null : brand.id)}
                                            className="p-2 text-gray-400 hover:text-gray-600"
                                        >
                                            <FiMoreVertical />
                                        </button>
                                        {showActions === brand.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleEditBrand(brand)}
                                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    >
                                                        <FiEdit2 className="w-4 h-4" />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBrand(brand.id)}
                                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="text-sm text-gray-500">Products</div>
                                        <div className="text-lg font-semibold text-gray-800">{brand.products}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Created</div>
                                        <div className="text-sm text-gray-800">{brand.createdAt}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <a
                                        href={brand.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Website
                                    </a>
                                    <div className="flex items-center space-x-2">
                                        {Object.entries(brand.socialMedia).map(([platform, handle]) => (
                                            <a
                                                key={platform}
                                                href={`https://${platform}.com/${handle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                {platform}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add/Edit Brand Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {selectedBrand ? 'Edit Brand' : 'Add New Brand'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setSelectedBrand(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                                    <input
                                        type="text"
                                        value={selectedBrand ? selectedBrand.name : newBrand.name}
                                        onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                                    <input
                                        type="text"
                                        value={selectedBrand ? selectedBrand.logo : newBrand.logo}
                                        onChange={(e) => setNewBrand({ ...newBrand, logo: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        value={selectedBrand ? selectedBrand.description : newBrand.description}
                                        onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                    <input
                                        type="url"
                                        value={selectedBrand ? selectedBrand.website : newBrand.website}
                                        onChange={(e) => setNewBrand({ ...newBrand, website: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                                        <input
                                            type="text"
                                            value={selectedBrand ? selectedBrand.socialMedia.facebook : newBrand.socialMedia.facebook}
                                            onChange={(e) => setNewBrand({
                                                ...newBrand,
                                                socialMedia: { ...newBrand.socialMedia, facebook: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                                        <input
                                            type="text"
                                            value={selectedBrand ? selectedBrand.socialMedia.instagram : newBrand.socialMedia.instagram}
                                            onChange={(e) => setNewBrand({
                                                ...newBrand,
                                                socialMedia: { ...newBrand.socialMedia, instagram: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                                        <input
                                            type="text"
                                            value={selectedBrand ? selectedBrand.socialMedia.twitter : newBrand.socialMedia.twitter}
                                            onChange={(e) => setNewBrand({
                                                ...newBrand,
                                                socialMedia: { ...newBrand.socialMedia, twitter: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        onClick={() => {
                                            setShowAddModal(false);
                                            setSelectedBrand(null);
                                        }}
                                        className="px-6 py-2 text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddBrand}
                                        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    >
                                        {selectedBrand ? 'Update Brand' : 'Add Brand'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Brands; 