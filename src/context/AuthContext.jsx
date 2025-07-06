import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getCurrentUserFromStorage();
        
        if (token && storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const result = await authService.register(userData);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials, method = 'email') => {
    try {
      setIsLoading(true);
      
      if (method === 'otp') {
        const result = await authService.verifyPhoneOTP(credentials.phone, credentials.otp);
        
        if (result.success) {
          setUser(result.data.user);
          setIsAuthenticated(true);
        }
        
        return result;
      }
      
      const result = await authService.login(credentials);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendPhoneOTP = async (phoneNumber) => {
    try {
      return await authService.sendPhoneOTP(phoneNumber);
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send OTP'
      };
    }
  };

  const verifyPhoneOTP = async (phoneNumber, otp) => {
    try {
      setIsLoading(true);
      const result = await authService.verifyPhoneOTP(phoneNumber, otp);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'OTP verification failed'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendRegistrationOTP = async (userData) => {
    try {
      return await authService.sendRegistrationOTP(userData);
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send registration OTP'
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const sendEmailOTP = async (email) => {
    try {
      return await authService.sendEmailOTP(email);
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send email OTP'
      };
    }
  };

  const verifyEmailOTP = async (email, otp, userData) => {
    try {
      setIsLoading(true);
      const result = await authService.verifyEmailOTP(email, otp, userData);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Email OTP verification failed'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phoneNumber) => {
    return await sendPhoneOTP(phoneNumber);
  };

  const verifyOTP = async (phoneNumber, otp) => {
    return await verifyPhoneOTP(phoneNumber, otp);
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    sendOTP,
    verifyOTP, 
    sendPhoneOTP,
    verifyPhoneOTP,
    sendRegistrationOTP,
    sendEmailOTP,
    verifyEmailOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
