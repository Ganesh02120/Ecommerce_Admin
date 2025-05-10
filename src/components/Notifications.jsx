import React, { useState } from 'react';
import { FiBell, FiX, FiCheck, FiAlertCircle, FiInfo, FiSettings, FiFilter, FiSearch, FiRefreshCw, FiSend, FiPlus, FiImage, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('push');
  const [pushNotification, setPushNotification] = useState({
    title: '',
    message: '',
    image: null
  });
  const [silentNotification, setSilentNotification] = useState({
    componentName: '',
    jsonConfig: ''
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'push',
      title: 'New Order Received',
      message: 'Order #12345 has been placed',
      image: 'https://example.com/order.jpg',
      timestamp: '2024-03-15 10:30 AM',
      status: 'sent'
    },
    {
      id: 2,
      type: 'silent',
      componentName: 'InventoryUpdate',
      jsonConfig: '{"stock": 100, "location": "warehouse-1"}',
      timestamp: '2024-03-15 09:15 AM',
      status: 'pending'
    }
  ]);
  const [showNotificationIcon, setShowNotificationIcon] = useState(true);
  const [unreadCount, setUnreadCount] = useState(3);

  const handlePushNotificationChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPushNotification(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPushNotification(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSilentNotificationChange = (e) => {
    const { name, value } = e.target;
    setSilentNotification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendPushNotification = () => {
    if (!pushNotification.title || !pushNotification.message) return;

    const newNotification = {
      id: notifications.length + 1,
      type: 'push',
      ...pushNotification,
      timestamp: new Date().toLocaleString(),
      status: 'sent'
    };

    setNotifications(prev => [newNotification, ...prev]);
    setPushNotification({
      title: '',
      message: '',
      image: null
    });
  };

  const handleAddSilentNotification = () => {
    if (!silentNotification.componentName || !silentNotification.jsonConfig) return;

    const newNotification = {
      id: notifications.length + 1,
      type: 'silent',
      ...silentNotification,
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    };

    setNotifications(prev => [newNotification, ...prev]);
    setSilentNotification({
      componentName: '',
      jsonConfig: ''
    });
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = notification.type === activeTab;
    return matchesFilter;
  });

  return (
    <div className="ml-60 bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-100   p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 bg-gray-100">
              <FiBell className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800 ">Notifications</h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-100">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('push')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'push'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Push Notifications
            </button>
            <button
              onClick={() => setActiveTab('silent')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'silent'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Silent Notifications
            </button>
          </nav>
        </div>

        {/* Push Notifications Form */}
        {activeTab === 'push' && (
          <div className="bg-gray-100 rounded-lg  p-6 mb-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={pushNotification.title}
                  onChange={handlePushNotificationChange}
                  className="w-full px-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Message
                </label>
                <textarea
                  name="message"
                  value={pushNotification.message}
                  onChange={handlePushNotificationChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter notification message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Image
                </label>
                <div className="mt-1 flex items-center">
                  <label className="relative cursor-pointer bg-gray-100 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md">
                      <FiImage className="w-5 h-5" />
                      <span>Upload Image</span>
                    </span>
                    <input
                      type="file"
                      name="image"
                      onChange={handlePushNotificationChange}
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                  {pushNotification.image && (
                    <div className="ml-4 relative">
                      <img
                        src={pushNotification.image}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                      <button
                        onClick={() => setPushNotification(prev => ({ ...prev, image: null }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setPushNotification({ title: '', message: '', image: null })}
                className="px-4 py-2 text-sm text-gray-900 hover:text-gray-900 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPushNotification}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <FiSend className="w-4 h-4" />
                <span>Send Notification</span>
              </button>
            </div>
          </div>
        )}

        {/* Silent Notifications Form */}
        {activeTab === 'silent' && (
          <div className="bg-gray-100   p-6 mb-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Component Name
                </label>
                <input
                  type="text"
                  name="componentName"
                  value={silentNotification.componentName}
                  onChange={handleSilentNotificationChange}
                  className="w-full px-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter component name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  JSON Configuration
                </label>
                <textarea
                  name="jsonConfig"
                  value={silentNotification.jsonConfig}
                  onChange={handleSilentNotificationChange}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 font-mono text-sm"
                  placeholder="Enter JSON configuration"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddSilentNotification}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add Notification</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications Table */}
        <div className="bg-gray-100  overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800">Recent Notifications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${notification.type === 'push'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                        }`}>
                        {notification.type === 'push' ? (
                          <FiBell className="w-4 h-4 mr-1" />
                        ) : (
                          <FiSettings className="w-4 h-4 mr-1" />
                        )}
                        {notification.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {notification.type === 'push' ? (
                        <div className="flex items-center space-x-3">
                          {notification.image && (
                            <img
                              src={notification.image}
                              alt="Notification"
                              className="h-10 w-10 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {notification.message}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {notification.componentName}
                          </div>
                          <div className="text-sm text-gray-500 font-mono">
                            {notification.jsonConfig}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notification.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${notification.status === 'sent'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {notification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
