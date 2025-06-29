import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard on successful login
      window.location.href = '/doctor/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF9FC] via-white to-[#D6EAF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-[#143D6F] hover:text-[#0F2A4F] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#D0D0D0]">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/abhicure_logo copy.jpg" 
              alt="AbhiCure Logo" 
              className="h-16 w-auto mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-bold text-[#4A4A4A] mb-2">Welcome Back</h1>
            <p className="text-[#AFAFAF]">Sign in to your doctor account</p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] ${
                    errors.email ? 'border-red-300' : 'border-[#D0D0D0]'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] ${
                    errors.password ? 'border-red-300' : 'border-[#D0D0D0]'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] hover:text-[#4A4A4A] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#143D6F] border-[#D0D0D0] rounded focus:ring-[#143D6F]"
                />
                <span className="ml-2 text-sm text-[#4A4A4A]">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#143D6F] hover:text-[#0F2A4F] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#143D6F] hover:bg-[#0F2A4F] disabled:bg-[#AFAFAF] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D0D0D0]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#AFAFAF]">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              to="/signup"
              className="w-full bg-transparent border-2 border-[#143D6F] text-[#143D6F] hover:bg-[#143D6F] hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              Create Account
            </Link>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-[#AFAFAF]">
          <p>&copy; 2024 AbhiCure. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;