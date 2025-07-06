import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken: refreshToken
          });
          
          const { token } = response.data;
          localStorage.setItem('token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

const authService = {
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      if (response.data.success) {
        const { token, refreshToken, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          data: { token, refreshToken, user },
          message: response.data.message
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Registration failed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  async login(credentials) {
    try {
      const loginData = {
        identifier: credentials.email || credentials.username || credentials.identifier,
        password: credentials.password
      };

      const response = await apiClient.post('/auth/login', loginData);
      
      if (response.data.success) {
        const { token, refreshToken, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          data: { token, refreshToken, user },
          message: response.data.message
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Login failed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  async sendPhoneOTP(phoneNumber) {
    try {
      const response = await apiClient.post('/auth/send-login-otp', {
        phone: phoneNumber 
      });
      
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP'
      };
    }
  },

  async verifyPhoneOTP(phoneNumber, otp) {
    try {
      const response = await apiClient.post('/auth/verify-login-otp', {
        phone: phoneNumber,
        otp: otp
      });
      
      if (response.data.success) {
        const { token, refreshToken, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          data: { token, refreshToken, user },
          message: response.data.message
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'OTP verification failed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'OTP verification failed'
      };
    }
  },

  async loginWithPhone(phoneNumber, otp) {
    try {
      const response = await apiClient.post('/auth/login-phone', {
        phoneNumber: phoneNumber,
        otp: otp
      });
      
      if (response.data.success) {
        const userData = response.data.data;
        localStorage.setItem('token', userData.token);
        localStorage.setItem('refreshToken', userData.refreshToken);
        localStorage.setItem('user', JSON.stringify(userData.user));
        
        return {
          success: true,
          data: userData,
          message: response.data.message
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Phone login failed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Phone login failed'
      };
    }
  },

  async sendRegistrationOTP(userData) {
    try {
      const response = await apiClient.post('/auth/send-registration-otp', userData);
      
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP'
      };
    }
  },

  async verifyRegistrationOTP(phoneNumber, otp, userData) {
    try {
      const response = await apiClient.post('/auth/verify-registration-otp', {
        phone: phoneNumber,
        otp: otp,
        ...userData
      });
      
      if (response.data.success) {
        const { token, refreshToken, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          data: { token, refreshToken, user },
          message: response.data.message
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Registration failed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  async sendEmailOTP(email) {
    try {
      const response = await apiClient.post('/auth/send-email-otp', {
        email: email
      });
      
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send email OTP'
      };
    }
  },

  async verifyEmailOTP(email, otp, userData) {
    try {
      const response = await apiClient.post('/auth/verify-email-otp', {
        email: email,
        otp: otp,
        ...userData
      });
      
      if (response.data.success) {
        const { token, refreshToken, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          success: true,
          data: { token, refreshToken, user },
          message: response.data.message
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Email verification failed'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Email verification failed'
      };
    }
  },

  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      
      if (response.data.success) {
        const user = response.data.data;
        localStorage.setItem('user', JSON.stringify(user));
        return {
          success: true,
          data: user
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Failed to get user profile'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get user profile'
      };
    }
  },

  async logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  getCurrentUserFromStorage() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUserFromStorage();
    return !!(token && user);
  }
};

export default authService;
