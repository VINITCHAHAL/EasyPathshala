import config from '../config/config.js';

const API_URL = '/api/auth';  // Using relative URL for development proxy

class AuthService {
  async register(userData) {
    try {
      console.log('Making registration request to:', API_URL);
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Registration failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.data?.token && data.data?.user) {
        this.setAuthData(data.data);
        return data;
      }
      
      throw new Error(data.message || 'Invalid response format from server');
    } catch (error) {
      console.error('Registration Error:', error);
      if (error.message === 'Failed to fetch') {
        return {
          success: false,
          message: 'Unable to connect to the server. Please check your internet connection or try again later.'
        };
      }
      return {
        success: false,
        message: error.message || 'An error occurred during registration'
      };
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (data.success) {
        this.setAuthData(data.data);
      }
      
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'An error occurred during login'
      };
    }
  }

  async logout() {
    try {
      const token = this.getToken();
      if (token) {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      this.clearAuthData();
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      this.clearAuthData();
      return {
        success: false,
        message: error.message || 'An error occurred during logout'
      };
    }
  }

  getCurrentUserFromStorage() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${API_URL}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      if (data.success && data.data?.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setAuthData(data) {
    if (data.token) localStorage.setItem('token', data.token);
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}

export default new AuthService();
