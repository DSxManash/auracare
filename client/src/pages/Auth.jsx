import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Dummy authentication logic
      console.log('Authenticating...', { isLogin, formData });
      
      // Simulate API call
      setTimeout(() => {
        // Store dummy token in localStorage
        localStorage.setItem('auraCareToken', 'dummy-jwt-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: formData.name || 'User'
        }));
        
        // Redirect to dashboard
        navigate('/dashboard');
      }, 1000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9F4] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="text-2xl font-bold text-[#1B2022]">🌿 AuraCare</span>
          </div>
          <h2 className="text-3xl font-bold text-[#1B2022] mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-[#6C757D]">
            {isLogin 
              ? 'Sign in to manage your plant care system' 
              : 'Join thousands of nurseries using smart plant care'
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field for signup */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1B2022] mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1B2022] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1B2022] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm password field for signup */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1B2022] mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#2D6A4F] text-white py-3 rounded-lg font-semibold hover:bg-[#74C69D] transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div className="mt-6 text-center">
            <p className="text-[#6C757D]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={toggleAuthMode}
                className="text-[#2D6A4F] font-semibold hover:text-[#74C69D] transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-sm text-[#6C757D]">
          <p>By continuing, you agree to AuraCare's Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
