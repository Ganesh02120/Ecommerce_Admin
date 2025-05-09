import React, { useState } from 'react';
import { FiPackage, FiTag, FiList, FiDroplet, FiSettings, FiSearch, FiFilter, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const Browse = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('');
    const [showInputFields, setShowInputFields] = useState(false);
    const [inputData, setInputData] = useState({
        name: '',
        status: 'Active',
        hex: '#000000',
        type: 'Select',
        unit: '',
        required: false,
        parent: 'None'
    });

    const browseItems = [
        {
            id: 1,
            title: 'Brands',
            icon: <FiPackage className="w-8 h-8 text-blue-500" />,
            description: 'Manage product brands',
            count: 24,
            color: 'bg-blue-50',
            data: [
                { id: 1, name: 'Nike', status: 'Active', products: 156, createdAt: '2024-01-15' },
                { id: 2, name: 'Adidas', status: 'Active', products: 143, createdAt: '2024-01-16' },
                { id: 3, name: 'Puma', status: 'Inactive', products: 89, createdAt: '2024-01-17' },
                { id: 4, name: 'Reebok', status: 'Active', products: 112, createdAt: '2024-01-18' },
                { id: 5, name: 'Under Armour', status: 'Active', products: 78, createdAt: '2024-01-19' },
            ],
            columns: ['ID', 'Name', 'Status', 'Products', 'Created At', 'Actions']
        },
        {
            id: 2,
            title: 'Categories',
            icon: <FiTag className="w-8 h-8 text-green-500" />,
            description: 'Manage product categories',
            count: 12,
            color: 'bg-green-50',
            data: [
                { id: 1, name: 'Electronics', status: 'Active', products: 234, parent: 'None' },
                { id: 2, name: 'Clothing', status: 'Active', products: 567, parent: 'None' },
                { id: 3, name: 'Smartphones', status: 'Active', products: 123, parent: 'Electronics' },
                { id: 4, name: 'Laptops', status: 'Active', products: 89, parent: 'Electronics' },
                { id: 5, name: 'T-Shirts', status: 'Active', products: 345, parent: 'Clothing' },
            ],
            columns: ['ID', 'Name', 'Status', 'Products', 'Parent Category', 'Actions']
        },
        {
            id: 3,
            title: 'Attribute Types',
            icon: <FiList className="w-8 h-8 text-purple-500" />,
            description: 'Manage attribute types',
            count: 8,
            color: 'bg-purple-50',
            data: [
                { id: 1, name: 'Size', type: 'Select', values: 5, required: true },
                { id: 2, name: 'Color', type: 'Color', values: 8, required: true },
                { id: 3, name: 'Material', type: 'Select', values: 4, required: false },
                { id: 4, name: 'Weight', type: 'Number', values: 1, required: false },
                { id: 5, name: 'Dimensions', type: 'Text', values: 1, required: false },
            ],
            columns: ['ID', 'Name', 'Type', 'Values', 'Required', 'Actions']
        },
        {
            id: 4,
            title: 'Colors',
            icon: <FiDroplet className="w-8 h-8 text-red-500" />,
            description: 'Manage product colors',
            count: 16,
            color: 'bg-red-50',
            data: [
                { id: 1, name: 'Red', hex: '#FF0000', products: 45 },
                { id: 2, name: 'Blue', hex: '#0000FF', products: 38 },
                { id: 3, name: 'Green', hex: '#00FF00', products: 29 },
                { id: 4, name: 'Black', hex: '#000000', products: 67 },
                { id: 5, name: 'White', hex: '#FFFFFF', products: 52 },
            ],
            columns: ['ID', 'Name', 'Color', 'Products', 'Actions']
        },
        {
            id: 5,
            title: 'Attributes',
            icon: <FiSettings className="w-8 h-8 text-yellow-500" />,
            description: 'Manage product attributes',
            count: 32,
            color: 'bg-yellow-50',
            data: [
                { id: 1, name: 'Screen Size', type: 'Number', unit: 'inches', required: true },
                { id: 2, name: 'RAM', type: 'Select', unit: 'GB', required: true },
                { id: 3, name: 'Storage', type: 'Select', unit: 'GB', required: true },
                { id: 4, name: 'Battery', type: 'Number', unit: 'mAh', required: false },
                { id: 5, name: 'Camera', type: 'Text', unit: 'MP', required: false },
            ],
            columns: ['ID', 'Name', 'Type', 'Unit', 'Required', 'Actions']
        }
    ];

    const handleComponentClick = (component) => {
        setSelectedComponent(component);
        setSearchQuery('');
        setShowFilters(false);
        setFilterStatus('');
        setSortBy('name');
        setSortOrder('asc');
        setShowInputFields(false);
        setInputData({
            name: '',
            status: 'Active',
            hex: '#000000',
            type: 'Select',
            unit: '',
            required: false,
            parent: 'None'
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddItem = () => {
        if (!selectedComponent || !inputData.name) return;

        const newItem = {
            id: selectedComponent.data.length + 1,
            ...inputData,
            products: 0,
            createdAt: new Date().toISOString().split('T')[0]
        };

        selectedComponent.data.push(newItem);
        setSelectedComponent({ ...selectedComponent });
        setShowInputFields(false);
        setInputData({
            name: '',
            status: 'Active',
            hex: '#000000',
            type: 'Select',
            unit: '',
            required: false,
            parent: 'None'
        });
    };

    const handleFilterChange = (type, value) => {
        switch (type) {
            case 'brand':
                setSelectedBrands(prev =>
                    prev.includes(value)
                        ? prev.filter(b => b !== value)
                        : [...prev, value]
                );
                break;
            case 'category':
                setSelectedCategories(prev =>
                    prev.includes(value)
                        ? prev.filter(c => c !== value)
                        : [...prev, value]
                );
                break;
            case 'color':
                setSelectedColors(prev =>
                    prev.includes(value)
                        ? prev.filter(c => c !== value)
                        : [...prev, value]
                );
                break;
            case 'attribute':
                setSelectedAttributes(prev =>
                    prev.includes(value)
                        ? prev.filter(a => a !== value)
                        : [...prev, value]
                );
                break;
        }
    };

    const getFilteredData = () => {
        if (!selectedComponent) return [];

        let filtered = [...selectedComponent.data];

        if (searchQuery) {
            filtered = filtered.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        if (filterStatus) {
            filtered = filtered.filter(item => item.status?.toLowerCase() === filterStatus.toLowerCase());
        }

        filtered.sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortBy === 'date') {
                comparison = new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortBy === 'products') {
                comparison = a.products - b.products;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    };

    const renderInputFields = () => {
        if (!selectedComponent) return null;

        switch (selectedComponent.title.toLowerCase()) {
            case 'brands':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={inputData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={inputData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Products</label>
                            <input
                                type="number"
                                name="products"
                                value={inputData.products || 0}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                    </div>
                );

            case 'categories':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={inputData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={inputData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Products</label>
                            <input
                                type="number"
                                name="products"
                                value={inputData.products || 0}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                            <select
                                name="parent"
                                value={inputData.parent}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            >
                                <option value="None">None</option>
                                {selectedComponent.data.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                );

            case 'attribute types':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={inputData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                name="type"
                                value={inputData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            >
                                <option value="Select">Select</option>
                                <option value="Color">Color</option>
                                <option value="Number">Number</option>
                                <option value="Text">Text</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Values</label>
                            <input
                                type="number"
                                name="values"
                                value={inputData.values || 0}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Required</label>
                            <input
                                type="checkbox"
                                name="required"
                                checked={inputData.required}
                                onChange={handleInputChange}
                                className="mt-2"
                            />
                        </div>
                    </div>
                );

            case 'colors':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={inputData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    name="hex"
                                    value={inputData.hex}
                                    onChange={handleInputChange}
                                    className="w-12 h-12 p-1 border border-gray-100 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="hex"
                                    value={inputData.hex}
                                    onChange={handleInputChange}
                                    className="flex-1 px-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Products</label>
                            <input
                                type="number"
                                name="products"
                                value={inputData.products || 0}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                    </div>
                );

            case 'attributes':
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={inputData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                name="type"
                                value={inputData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            >
                                <option value="Select">Select</option>
                                <option value="Number">Number</option>
                                <option value="Text">Text</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                            <input
                                type="text"
                                name="unit"
                                value={inputData.unit}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Required</label>
                            <input
                                type="checkbox"
                                name="required"
                                checked={inputData.required}
                                onChange={handleInputChange}
                                className="mt-2"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="ml-60 bg-gray-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse</h2>

                {/* Component Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                    {browseItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleComponentClick(item)}
                            className={`${item.color} rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 ${selectedComponent?.id === item.id ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                {item.icon}
                                <span className="text-sm font-medium text-gray-500">
                                    {item.count} items
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Data Table Section */}
                {selectedComponent && (
                    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{selectedComponent.title}</h2>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                                >
                                    <FiFilter />
                                    <span>Filters</span>
                                </button>
                                <button
                                    onClick={() => setShowInputFields(!showInputFields)}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    <FiPlus />
                                    <span>Add New</span>
                                </button>
                            </div>
                        </div>

                        {showInputFields && (
                            <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New {selectedComponent.title.slice(0, -1)}</h3>
                                {renderInputFields()}
                                <div className="mt-4 flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowInputFields(false)}
                                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddItem}
                                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="mb-6 flex items-center space-x-4">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                />
                            </div>
                        </div>

                        {showFilters && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        >
                                            <option value="">All</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        >
                                            <option value="name">Name</option>
                                            <option value="date">Date</option>
                                            <option value="products">Products</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                                        <select
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                                        >
                                            <option value="asc">Ascending</option>
                                            <option value="desc">Descending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {selectedComponent.columns.map((column, index) => (
                                            <th
                                                key={index}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {getFilteredData().map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            {Object.entries(item).map(([key, value], index) => {
                                                if (key === 'hex') {
                                                    return (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div
                                                                    className="w-6 h-6 rounded-full mr-2"
                                                                    style={{ backgroundColor: value }}
                                                                />
                                                                <span>{value}</span>
                                                            </div>
                                                        </td>
                                                    );
                                                }
                                                if (key !== 'id') {
                                                    return (
                                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {value}
                                                        </td>
                                                    );
                                                }
                                                return (
                                                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {value}
                                                    </td>
                                                );
                                            })}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <FiEdit2 />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse; 