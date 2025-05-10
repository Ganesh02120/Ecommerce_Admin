import React, { useState, useEffect } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShoppingBag, FiShield, FiTrendingUp, FiUsers, FiPackage, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);
      setIsValidEmail(isValid);
      setEmailError(isValid ? '' : 'Please enter a valid email address');
    }
  }, [email, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      // Password validation (minimum 8 characters, at least one number and one special character)
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      const isValid = passwordRegex.test(password);
      setIsValidPassword(isValid);
      setPasswordError(isValid ? '' : 'Password must be at least 8 characters long and include at least one number and one special character');
    }
  }, [password, isSubmitted]);

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError('Email is required');
      setIsValidEmail(false);
      isValid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      setIsValidPassword(false);
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    setIsSubmitted(true);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call with delay
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'Admin@123') {
        // Reset login attempts on successful login
        setLoginAttempts(0);
        onLoginSuccess();
        navigate('/dashboard');
      } else {
        setLoginAttempts(prev => prev + 1);
        if (loginAttempts >= 2) {
          setError('Too many failed attempts. Please try again after 30 seconds.');
          // Disable login for 30 seconds
          setTimeout(() => {
            setLoginAttempts(0);
            setError('');
          }, 30000);
        } else {
          setError('Invalid email or password');
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <FiShoppingBag className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">E-Commerce Admin</h2>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4 transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <FiTrendingUp className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Real-time Analytics</h3>
                <p className="text-gray-600">Monitor your store's performance with detailed analytics and insights.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                <FiUsers className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Customer Management</h3>
                <p className="text-gray-600">Manage customer data, orders, and interactions efficiently.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <FiPackage className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Inventory Control</h3>
                <p className="text-gray-600">Track and manage your product inventory in real-time.</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">2.5K+</p>
              <div className="mt-2 flex items-center text-green-500 text-sm">
                <FiTrendingUp className="mr-1" />
                <span>12% increase</span>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">10K+</p>
              <div className="mt-2 flex items-center text-green-500 text-sm">
                <FiTrendingUp className="mr-1" />
                <span>8% increase</span>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 flex items-center space-x-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm p-4 rounded-lg">
            <FiShield className="text-green-500" />
            <span>Secure login with 256-bit encryption</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <FiShoppingBag className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={`text-${isValidEmail ? 'green' : 'gray'}-400`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`block w-full pl-10 pr-10 py-3 border ${isSubmitted && emailError ? 'border-red-300' : isValidEmail ? 'border-green-300' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    required
                  />
                  {isValidEmail && email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <FiCheckCircle className="text-green-500" />
                    </div>
                  )}
                  {isSubmitted && emailError && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <FiAlertCircle className="text-red-500" />
                    </div>
                  )}
                </div>
                {isSubmitted && emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className={`text-${isValidPassword ? 'green' : 'gray'}-400`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`block w-full pl-10 pr-10 py-3 border ${isSubmitted && passwordError ? 'border-red-300' : isValidPassword ? 'border-green-300' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  {isSubmitted && passwordError && (
                    <div className="absolute inset-y-0 right-10 pr-3 flex items-center">
                      <FiAlertCircle className="text-red-500" />
                    </div>
                  )}
                </div>
                {isSubmitted && passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-shake">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading || !isValidEmail || !isValidPassword}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] ${(isLoading || !isValidEmail || !isValidPassword) ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {/* Divider
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
                </div>
              </div>
            </div> */}

            {/* Social Login Buttons
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all transform hover:scale-[1.02]">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all transform hover:scale-[1.02]">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </button>
            </div> */}
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Sign up
            </a>
          </p>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
