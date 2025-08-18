import React, { useState, useEffect } from 'react';
import { Clock, Database, Server, Globe, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const MonitoringDashboard = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const checkSystemHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const data = await response.json();
      setHealthData(data);
      setLastCheck(new Date().toLocaleString());
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthData({
        success: false,
        message: 'Unable to connect to backend',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const checkDatabaseHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health/db`);
      return await response.json();
    } catch (error) {
      return { success: false, message: 'Database check failed' };
    }
  };

  useEffect(() => {
    checkSystemHealth();
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const StatusIndicator = ({ status, label }) => (
    <div className="flex items-center space-x-2">
      {status ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      )}
      <span className={status ? 'text-green-700' : 'text-red-700'}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">System Health Dashboard</h1>
        <button
          onClick={checkSystemHealth}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {lastCheck && (
        <p className="text-sm text-gray-600 mb-4">
          Last checked: {lastCheck}
        </p>
      )}

      {healthData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Backend Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Server className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold">Backend Service</h2>
            </div>
            <StatusIndicator 
              status={healthData.success} 
              label={healthData.success ? 'Running' : 'Down'} 
            />
            {healthData.success && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Environment: {healthData.environment}</p>
                <p>Uptime: {Math.floor(healthData.system?.uptime / 60)} minutes</p>
                <p>Memory: {Math.round(healthData.system?.memory?.heapUsed / 1024 / 1024)}MB</p>
              </div>
            )}
          </div>

          {/* Database Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Database className="w-6 h-6 text-green-600" />
              <h2 className="text-lg font-semibold">MongoDB Atlas</h2>
            </div>
            <StatusIndicator 
              status={healthData.database?.status === 'connected'} 
              label={healthData.database?.status || 'Unknown'} 
            />
            {healthData.database && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Database: {healthData.database.name}</p>
                <p>Host: {healthData.database.host}</p>
              </div>
            )}
          </div>

          {/* Frontend Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Globe className="w-6 h-6 text-purple-600" />
              <h2 className="text-lg font-semibold">Frontend (Vercel)</h2>
            </div>
            <StatusIndicator status={true} label="Active" />
            <div className="mt-2 text-sm text-gray-600">
              <p>Status: You're viewing this page!</p>
              <p>Platform: Vercel</p>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <h2 className="text-lg font-semibold">API Endpoints</h2>
            </div>
            {healthData.endpoints && (
              <div className="space-y-1 text-sm">
                {Object.entries(healthData.endpoints).map(([key, path]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key}:</span>
                    <span className="text-blue-600">{path}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Health Check URLs:</h3>
        <div className="space-y-1 text-sm">
          <p><strong>Backend Health:</strong> <code>{API_BASE_URL}/api/health</code></p>
          <p><strong>Database Health:</strong> <code>{API_BASE_URL}/api/health/db</code></p>
          <p><strong>API Endpoints:</strong> <code>{API_BASE_URL}/api/health/endpoints</code></p>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;