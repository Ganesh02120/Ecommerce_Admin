import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AdminProductTable from './components/AdminProductTable';
import Login from './components/Login';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import Profile from './components/Profile';
import Stores from './components/Stores';
import Users from './components/Users';
import Notifications from './components/Notifications';
import Browse from './components/Browse'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {isLoggedIn && <Sidebar onLogout={handleLogout} />}  {/* Sidebar only in App.jsx */}
        <div className="flex-1 p-6">
          <Routes>
            {!isLoggedIn ? (
              <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            ) : (
              <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<AdminProductTable />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/stores" element={<Stores />} />
                <Route path="/users" element={<Users />} />
                <Route path="/notifications" element={<Notifications />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
