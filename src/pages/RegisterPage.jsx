import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import OTPVerification from '../components/OTPVerification';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { sendRegistrationOTP, sendEmailOTP, verifyEmailOTP, isLoading, setUser } = useAuth();
  
  const [registrationMethod, setRegistrationMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpData, setOtpData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Clear opposite field when switching methods
  useEffect(() => {
    if (registrationMethod === 'email') {
      setFormData(prev => ({ ...prev, phone: '' }));
    } else {
      setFormData(prev => ({ ...prev, email: '' }));
    }
    setErrors({});
  }, [registrationMethod]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters long';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (registrationMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (registrationMethod === 'phone') {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (registrationMethod === 'phone') {
        // Send OTP for phone registration
        const result = await sendRegistrationOTP(formData.phone);
        if (result.success) {
          setOtpData({
            type: 'phone',
            identifier: formData.phone,
            userData: {
              fullName: formData.fullName,
              username: formData.username,
              email: null, // No email for phone registration
              password: formData.password
            }
          });
          setShowOTP(true);
          setSuccess('OTP sent successfully to your phone!');
        } else {
          setErrors({ phone: result.error });
        }
      } else {
        // Send OTP for email registration
        const result = await sendEmailOTP(formData.email);
        if (result.success) {
          setOtpData({
            type: 'email',
            identifier: formData.email,
            userData: {
              fullName: formData.fullName,
              username: formData.username,
              password: formData.password
            }
          });
          setShowOTP(true);
          setSuccess('OTP sent successfully to your email!');
        } else {
          setErrors({ email: result.error });
        }
      }
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleOTPVerify = async (otp) => {
    try {
      let result;
      
      if (otpData.type === 'phone') {
        // Phone OTP verification
        result = await authService.verifyRegistrationOTP(otpData.identifier, otp, otpData.userData);
      } else {
        // Email OTP verification
        result = await verifyEmailOTP(otpData.identifier, otp, otpData.userData);
      }
      
      if (result.success) {
        console.log('✅ Registration successful via', otpData.type, ':', result.user);
        
        // Update the AuthContext user state
        setUser(result.user);
        
        setSuccess(`Registration successful! Welcome to EasyPathshala!`);
        
        // Navigate immediately to ensure auto-login works
        navigate('/', { replace: true });
        
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('❌ OTP verification failed:', error);
      throw error;
    }
  };

  const handleOTPResend = async () => {
    try {
      let result;
      
      if (otpData.type === 'phone') {
        result = await sendRegistrationOTP(otpData.identifier);
      } else {
        result = await sendEmailOTP(otpData.identifier);
      }
      
      if (result.success) {
        setSuccess('OTP resent successfully!');
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-emerald-500' };
    return { score, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (showOTP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md w-full">
          <OTPVerification
            phone={otpData?.type === 'phone' ? otpData.identifier : null}
            email={otpData?.type === 'email' ? otpData.identifier : null}
            type={otpData?.type || 'phone'}
            onVerify={handleOTPVerify}
            onResend={handleOTPResend}
            isLoading={isLoading}
            onBack={() => setShowOTP(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors mb-6">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Join EasyPathshala</h1>
          <p className="text-white/70">Create your account and start your learning journey</p>
        </div>

        {/* Registration Method Selector */}
        <div className="mb-6">
          <div className="flex rounded-xl bg-white/10 p-1 backdrop-blur-sm">
            <button
              onClick={() => setRegistrationMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                registrationMethod === 'email'
                  ? 'bg-emerald-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Mail size={16} className="inline mr-2" />
              Email
            </button>
            <button
              onClick={() => setRegistrationMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                registrationMethod === 'phone'
                  ? 'bg-emerald-500 text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Phone size={16} className="inline mr-2" />
              Phone
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 ${
                  errors.fullName ? 'border-red-400' : 'border-white/20'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.fullName && (
              <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 ${
                  errors.username ? 'border-red-400' : 'border-white/20'
                }`}
                placeholder="Choose a username"
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.username}
              </p>
            )}
          </div>

          {/* Email Input */}
          {registrationMethod === 'email' && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>
          )}

          {/* Phone Input */}
          {registrationMethod === 'phone' && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 ${
                    errors.phone ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 ${
                  errors.password ? 'border-red-400' : 'border-white/20'
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-white/60">Password Strength:</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength.score <= 2 ? 'text-red-400' :
                    passwordStrength.score <= 3 ? 'text-yellow-400' :
                    passwordStrength.score <= 4 ? 'text-emerald-400' : 'text-green-400'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}
            
            {errors.password && (
              <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 ${
                  errors.confirmPassword ? 'border-red-400' : 'border-white/20'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {registrationMethod === 'phone' ? 'Sending OTP...' : 'Creating Account...'}
              </>
            ) : (
              <>
                <UserPlus size={20} />
                {registrationMethod === 'phone' ? 'Send OTP' : 'Create Account'}
              </>
            )}
          </button>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle size={16} />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="text-emerald-400 text-sm text-center flex items-center justify-center gap-2">
                <CheckCircle size={16} />
                {success}
              </p>
            </div>
          )}
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-white/60">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;