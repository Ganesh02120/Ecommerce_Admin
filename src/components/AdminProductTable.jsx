import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    'All',
    'Electronics',
    'Computers',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Beauty',
    'Sports',
    'Toys',
    'Other'
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Wireless Headphones',
          description: 'Premium noise-cancelling wireless headphones with superior sound quality.',
          category: 'Electronics',
          price: 129.99,
          stock: 25,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 2,
          name: 'Smart Watch',
          description: 'Fitness and health tracking smart watch with heart rate monitor.',
          category: 'Electronics',
          price: 199.99,
          stock: 3,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 3,
          name: 'Bluetooth Speaker',
          description: 'Portable Bluetooth speaker with 20 hours of battery life.',
          category: 'Electronics',
          price: 79.99,
          stock: 15,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 4,
          name: 'Smartphone',
          description: 'Latest generation smartphone with professional camera.',
          category: 'Electronics',
          price: 899.99,
          stock: 0,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 5,
          name: 'Laptop',
          description: 'High-performance laptop for gaming and professional use.',
          category: 'Computers',
          price: 1299.99,
          stock: 8,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 6,
          name: 'Running Shoes',
          description: 'Comfortable running shoes for all terrains.',
          category: 'Clothing',
          price: 89.99,
          stock: 12,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 7,
          name: 'Cookware Set',
          description: 'Non-stick cookware set for your kitchen.',
          category: 'Home & Kitchen',
          price: 149.99,
          stock: 5,
          image: 'https://via.placeholder.com/50',
        },
        {
          id: 8,
          name: 'Novel Book',
          description: 'Bestselling novel with thrilling story.',
          category: 'Books',
          price: 19.99,
          stock: 30,
          image: 'https://via.placeholder.com/50',
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const getStatus = (stock) => (stock > 0 ? 'Active' : 'Out Of Stock');
  const getStatusBadge = (status) =>
    status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="ml-60 bg-gray-100 min-h-screen flex flex-col">
      <div className="w-full">
        {/* Card Header */}
        <div className="bg-gray-100 rounded-none  px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
          </div>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-gray-50"
              />
            </div>
            <div className="relative flex-1 md:w-52">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-gray-50"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-100 rounded-none  px-2 pb-2 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">No products found</td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const status = getStatus(product.stock);
                  return (
                    <tr key={product.id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex items-center">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover mr-4 border border-gray-200" />
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 truncate">{product.name}</div>
                            <div className="text-xs text-gray-500 truncate max-w-[180px] md:max-w-xs">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(status)}`}>{status}</span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FiEdit2 />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
              <p className="mb-4 text-gray-600">
                Are you sure you want to delete <span className="font-bold">{selectedProduct?.name}</span>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-300"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => {
                    setProducts(products.filter((p) => p.id !== selectedProduct.id));
                    setShowDeleteModal(false);
                    toast.success('Product deleted');
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

export default AdminProductTable;