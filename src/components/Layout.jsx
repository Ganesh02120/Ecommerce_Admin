import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FiMenu } from 'react-icons/fi';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Sidebar - Toggles on Mobile, Fixed on Desktop */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:transform-none`}
      >
        <Sidebar onLogout={() => console.log('Logout')} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Backdrop for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Mobile Top Navbar */}
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b shadow-sm sticky top-0 z-40">
          <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          <button onClick={() => setIsSidebarOpen(true)}>
            <FiMenu className="w-6 h-6 text-gray-700" />
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
