const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

class ServiceMonitor {
  constructor() {
    this.backendUrl = process.env.NODE_ENV === 'production' 
      ? 'https://easypathshala.onrender.com'
      : 'http://localhost:5000';
    this.frontendUrl = process.env.CLIENT_URL;
  }

  async checkBackendHealth() {
    try {
      console.log('🔍 Checking Backend Health...');
      const response = await axios.get(`${this.backendUrl}/api/health`, {
        timeout: 10000
      });
      
      console.log('✅ Backend Status:', response.data.message);
      console.log('📊 Database Status:', response.data.database.status);
      console.log('⏱️  Uptime:', Math.floor(response.data.system.uptime / 60), 'minutes');
      return true;
    } catch (error) {
      console.error('❌ Backend Health Check Failed:', error.message);
      return false;
    }
  }

  async checkDatabaseHealth() {
    try {
      console.log('🔍 Checking Database Health...');
      const response = await axios.get(`${this.backendUrl}/api/health/db`, {
        timeout: 10000
      });
      
      console.log('✅ Database Status:', response.data.message);
      console.log('📚 Collections Count:', response.data.database.collections);
      return true;
    } catch (error) {
      console.error('❌ Database Health Check Failed:', error.message);
      return false;
    }
  }

  async checkAPIEndpoints() {
    try {
      console.log('🔍 Checking API Endpoints...');
      
      // Test courses endpoint (public)
      const coursesResponse = await axios.get(`${this.backendUrl}/api/courses`, {
        timeout: 10000
      });
      console.log('✅ Courses API working');
      
      // Test endpoints info
      const endpointsResponse = await axios.get(`${this.backendUrl}/api/health/endpoints`, {
        timeout: 10000
      });
      console.log('📋 Available endpoints:', endpointsResponse.data.endpoints.length);
      
      return true;
    } catch (error) {
      console.error('❌ API Endpoints Check Failed:', error.message);
      return false;
    }
  }

  async checkFrontendConnectivity() {
    try {
      console.log('🔍 Checking Frontend Connectivity...');
      const response = await axios.get(this.frontendUrl, {
        timeout: 10000
      });
      
      if (response.status === 200) {
        console.log('✅ Frontend is accessible');
        return true;
      }
    } catch (error) {
      console.error('❌ Frontend Check Failed:', error.message);
      return false;
    }
  }

  async runFullHealthCheck() {
    console.log('🚀 Starting Full System Health Check...');
    console.log('=' .repeat(50));
    
    const results = {
      backend: await this.checkBackendHealth(),
      database: await this.checkDatabaseHealth(),
      api: await this.checkAPIEndpoints(),
      frontend: await this.checkFrontendConnectivity()
    };
    
    console.log('=' .repeat(50));
    console.log('📊 Health Check Summary:');
    console.log('Backend:', results.backend ? '✅ Healthy' : '❌ Issues');
    console.log('Database:', results.database ? '✅ Healthy' : '❌ Issues');
    console.log('API Endpoints:', results.api ? '✅ Healthy' : '❌ Issues');
    console.log('Frontend:', results.frontend ? '✅ Healthy' : '❌ Issues');
    
    const overallHealth = Object.values(results).every(status => status);
    console.log('Overall Status:', overallHealth ? '🟢 All Systems Operational' : '🔴 Issues Detected');
    
    return results;
  }

  async testFullFlow() {
    try {
      console.log('🔄 Testing Full Application Flow...');
      
      // Test registration flow (optional - creates test user)
      console.log('Testing user registration...');
      const testUser = {
        name: 'Health Check User',
        email: `healthcheck_${Date.now()}@test.com`,
        password: 'TestPassword123!'
      };
      
      const registerResponse = await axios.post(`${this.backendUrl}/api/auth/register`, testUser);
      console.log('✅ Registration flow working');
      
      // Test login with the same user
      console.log('Testing user login...');
      const loginResponse = await axios.post(`${this.backendUrl}/api/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login flow working');
      
      // Test accessing protected routes
      const token = loginResponse.data.token;
      const userResponse = await axios.get(`${this.backendUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Protected routes working');
      
      return true;
    } catch (error) {
      console.error('❌ Full Flow Test Failed:', error.response?.data?.message || error.message);
      return false;
    }
  }
}

// Export for use in other files
module.exports = ServiceMonitor;

// If run directly, execute health check
if (require.main === module) {
  const monitor = new ServiceMonitor();
  
  async function main() {
    await monitor.runFullHealthCheck();
    
    // Optionally run full flow test
    console.log('\n🔄 Running Full Flow Test...');
    await monitor.testFullFlow();
  }
  
  main().catch(console.error);
}