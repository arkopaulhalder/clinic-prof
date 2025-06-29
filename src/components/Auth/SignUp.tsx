import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, GraduationCap } from 'lucide-react';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const specializations = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Radiology'
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name should contain only letters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name should contain only letters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Indian format)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+91\s\d{5}\s\d{5}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number (+91 XXXXX XXXXX)';
    }

    // Specialization validation
    if (!formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }

    // License number validation
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'Medical license number is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.licenseNumber)) {
      newErrors.licenseNumber = 'License number should be alphanumeric';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as +91 XXXXX XXXXX
    if (digits.length <= 2) {
      return '+91 ';
    } else if (digits.length <= 7) {
      return `+91 ${digits.slice(2)}`;
    } else {
      return `+91 ${digits.slice(2, 7)} ${digits.slice(7, 12)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phone', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard on successful registration
      window.location.href = '/doctor/dashboard';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF9FC] via-white to-[#D6EAF8] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-[#143D6F] hover:text-[#0F2A4F] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#D0D0D0]">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/abhicure_logo copy.jpg" 
              alt="AbhiCure Logo" 
              className="h-16 w-auto mx-auto mb-4 object-contain"
            />
            <h1 className="text-2xl font-bold text-[#4A4A4A] mb-2">Create Your Account</h1>
            <p className="text-[#AFAFAF]">Join AbhiCure as a healthcare professional</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] ${
                      errors.firstName ? 'border-red-300' : 'border-[#D0D0D0]'
                    }`}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] ${
                      errors.lastName ? 'border-red-300' : 'border-[#D0D0D0]'
                    }`}
                    placeholder="Enter last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

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

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] ${
                    errors.phone ? 'border-red-300' : 'border-[#D0D0D0]'
                  }`}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Specialization *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
                  <select
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] ${
                      errors.specialization ? 'border-red-300' : 'border-[#D0D0D0]'
                    }`}
                  >
                    <option value="">Select specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                {errors.specialization && (
                  <p className="text-red-600 text-sm mt-1">{errors.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Medical License Number *
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] ${
                    errors.licenseNumber ? 'border-red-300' : 'border-[#D0D0D0]'
                  }`}
                  placeholder="Enter license number"
                />
                {errors.licenseNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.licenseNumber}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Create password"
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

              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] ${
                      errors.confirmPassword ? 'border-red-300' : 'border-[#D0D0D0]'
                    }`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] hover:text-[#4A4A4A] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms Agreement */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 text-[#143D6F] border-[#D0D0D0] rounded focus:ring-[#143D6F] mt-1"
                />
                <span className="ml-2 text-sm text-[#4A4A4A]">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#143D6F] hover:text-[#0F2A4F] transition-colors">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#143D6F] hover:text-[#0F2A4F] transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-600 text-sm mt-1">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#143D6F] hover:bg-[#0F2A4F] disabled:bg-[#AFAFAF] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D0D0D0]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#AFAFAF]">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link
              to="/signin"
              className="w-full bg-transparent border-2 border-[#143D6F] text-[#143D6F] hover:bg-[#143D6F] hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
            >
              Sign In
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

export default SignUp;