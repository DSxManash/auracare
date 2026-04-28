import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react'; // or any icon set

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',  // we'll ignore it for login, but you can keep it for signup
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Persist email when switching modes
  useEffect(() => {
    setErrors({});
    setApiError('');
    setSuccessMessage('');
  }, [isLogin]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Keep the email to avoid retyping
    setFormData((prev) => ({ ...prev, email: prev.email, password: '', name: '' }));
  };

  const validateClient = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Minimum 8 characters';
    } else if (!/[a-z]/.test(formData.password) || !/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
      newErrors.password = 'Password needs uppercase, lowercase, and a number';
    }

    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    return newErrors;
  };

  const getFriendlyAuthError = (res, data) => {
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (data?.details?.[0]?.msg) return data.details[0].msg;

    if (!res) return 'We could not reach the server. Please try again.';

    switch (res.status) {
      case 400:
        return 'Please check your details and try again.';
      case 401:
        return 'Email or password is incorrect.';
      case 403:
        return 'Access is blocked for this request. Please check your browser origin or try again later.';
      case 429:
        return 'Too many attempts. Please wait a moment and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    const endpoint = buildApiUrl(isLogin ? '/api/auth/login' : '/api/auth/register');
    const body = { email: formData.email, password: formData.password };
    if (!isLogin) body.name = formData.name;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',   // crucial for cookies
      });

      const contentType = res.headers.get('content-type');
      const data = contentType?.includes('application/json') ? await res.json() : {};

      if (!res.ok) {
        const errorMessage = getFriendlyAuthError(res, data);
        throw new Error(errorMessage);
      }

      if (isLogin) {
        if (!data?.accessToken) {
          throw new Error('Login failed: access token missing');
        }

        login(data.accessToken, data.user);
        navigate('/dashboard');
      } else {
        setSuccessMessage('Account created successfully. Please sign in.');
        setIsLogin(true);
        setFormData((prev) => ({ ...prev, password: '', name: '' }));
      }
    } catch (err) {
      setApiError(
        err?.message === 'Failed to fetch'
          ? 'We could not reach the server. Please check your connection or try again later.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8F9F4] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
              : 'Join thousands of nurseries using smart plant care'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General API error */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {apiError}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            {/* Name field for signup only */}
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
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
            )}

            {/* Email */}
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
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password with show/hide and strength meter */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1B2022] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}

             
            </div>

            {/* Submit button – primary action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D6A4F] text-white py-3 rounded-lg font-semibold hover:bg-[#74C69D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : null}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Secondary action: toggle mode */}
          <div className="mt-6 text-center">
            <p className="text-[#6C757D]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={toggleAuthMode}
                className="text-[#2D6A4F] font-semibold hover:text-[#74C69D] transition-colors underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Tertiary action: forgot password placeholder */}
          {isLogin && (
            <div className="text-center mt-2">
              <button
                className="text-sm text-[#6C757D] hover:text-[#2D6A4F] transition-colors underline"
                onClick={() => alert('Password reset coming soon')}
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[#6C757D]">
          <p>By continuing, you agree to AuraCare's Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;