import React from 'react';
import {
  LineChart, Line,
  BarChart, Bar,
  CartesianGrid, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign, FiAlertCircle, FiBox, FiShoppingCart, FiPackage, FiCalendar } from 'react-icons/fi';

const data = [
  { name: 'Jan', sales: 4000, orders: 2400, customers: 1800 },
  { name: 'Feb', sales: 3000, orders: 1398, customers: 1200 },
  { name: 'Mar', sales: 2000, orders: 9800, customers: 2400 },
  { name: 'Apr', sales: 2780, orders: 3908, customers: 2100 },
  { name: 'May', sales: 1890, orders: 4800, customers: 1900 },
  { name: 'Jun', sales: 2390, orders: 3800, customers: 2200 },
  { name: 'Jul', sales: 3490, orders: 4300, customers: 2600 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Books', value: 300 },
  { name: 'Others', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = ({ onLogout }) => {
  // Sample data - replace with actual data from your backend
  const stats = {
    totalRevenue: 45678.90,
    totalOrders: 1234,
    totalCustomers: 5678,
    averageOrderValue: 37.02
  };

  const topProducts = [
    { id: 1, name: 'Wireless Headphones', sales: 234, revenue: 23400 },
    { id: 2, name: 'Smart Watch', sales: 189, revenue: 18900 },
    { id: 3, name: 'Laptop Backpack', sales: 156, revenue: 7800 },
    { id: 4, name: 'Bluetooth Speaker', sales: 145, revenue: 7250 },
    { id: 5, name: 'Phone Case', sales: 134, revenue: 2680 }
  ];

  const lowStockItems = [
    { id: 1, name: 'Wireless Earbuds', stock: 5, threshold: 10 },
    { id: 2, name: 'Gaming Mouse', stock: 3, threshold: 15 },
    { id: 3, name: 'Mechanical Keyboard', stock: 2, threshold: 20 },
    { id: 4, name: 'USB-C Hub', stock: 4, threshold: 12 }
  ];

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Admin'}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FiCalendar className="text-gray-400" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiDollarSign className="text-blue-600 text-xl" />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center">
              <FiTrendingUp className="mr-1" /> +12.5%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toLocaleString()}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiShoppingCart className="text-purple-600 text-xl" />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center">
              <FiTrendingUp className="mr-1" /> +8.2%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.totalOrders.toLocaleString()}</p>
        </div>

        {/* Total Customers */}
        <div className="bg-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <FiUsers className="text-green-600 text-xl" />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center">
              <FiTrendingUp className="mr-1" /> +5.7%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Customers</h3>
          <p className="text-2xl font-bold text-gray-800">{stats.totalCustomers.toLocaleString()}</p>
        </div>

        {/* Average Order Value */}
        <div className="bg-gray-100 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <FiTrendingUp className="text-orange-600 text-xl" />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center">
              <FiTrendingUp className="mr-1" /> +3.2%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Average Order Value</h3>
          <p className="text-2xl font-bold text-gray-800">${stats.averageOrderValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts and Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Analytics Chart */}
        <div className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Sales Analytics</h2>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Orders Overview Chart */}
        <div className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Orders Overview</h2>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="orders"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Top Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FiPackage className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">${product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Low Stock Alerts</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <FiAlertCircle className="text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Threshold: {item.threshold}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{item.stock} left</p>
                    <p className="text-sm text-gray-500">in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;