import React, { useState, useEffect, useRef } from 'react';
import { Shield, Clock, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

const OTPVerification = ({ 
  phone, 
  email, // ✅ ADD: Support email parameter
  type = 'phone', // ✅ ADD: Support type parameter
  onVerify, 
  onResend, 
  isLoading = false,
  onBack 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && !isVerifying) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      if (!isVerifying) {
        handleVerify(pastedData);
      }
    }
  };

  const handleVerify = async (otpCode = otp.join('')) => {
    if (otpCode.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await onVerify(otpCode);
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setTimeLeft(300);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    try {
      await onResend();
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  // ✅ FIX: Dynamic display based on type
  const identifier = type === 'email' ? email : phone;
  const maskedIdentifier = type === 'email' 
    ? email?.replace(/(.{2}).*(@.*)/, '$1****$2') 
    : phone?.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {type === 'email' ? 'Verify Your Email' : 'Verify Your Phone'}
        </h2>
        <p className="text-white/70">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-emerald-400 font-medium">{maskedIdentifier}</p>
      </div>

      {/* OTP Input */}
      <div className="mb-6">
        <div className="flex gap-3 justify-center mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-xl font-bold rounded-xl border-2 transition-all duration-300 ${
                digit 
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400' 
                  : error 
                    ? 'border-red-400 bg-red-500/10 text-white' 
                    : 'border-white/20 bg-white/5 text-white'
              } focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400`}
              disabled={isVerifying || isLoading}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Timer and Resend */}
      <div className="text-center mb-6">
        {timeLeft > 0 ? (
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <Clock size={16} />
            <span>Resend OTP in {formatTime(timeLeft)}</span>
          </div>
        ) : (
          <button
            onClick={handleResend}
            disabled={!canResend || isLoading}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
          >
            <RotateCcw size={16} />
            Resend OTP
          </button>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={() => handleVerify()}
        disabled={otp.some(digit => !digit) || isVerifying || isLoading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isVerifying || isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Verifying...
          </>
        ) : (
          <>
            <CheckCircle size={20} />
            Verify OTP
          </>
        )}
      </button>

      {/* Back Button */}
      <button
        onClick={onBack}
        disabled={isVerifying || isLoading}
        className="w-full mt-4 bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {type === 'email' ? 'Back to Email Entry' : 'Back to Phone Entry'}
      </button>
    </div>
  );
};

export default OTPVerification;