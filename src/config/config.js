const isDevelopment = import.meta.env.MODE === 'development';

const config = {
  apiBaseUrl: isDevelopment ? 'http://localhost:5000' : (import.meta.env.VITE_API_URL || 'https://easypathshala-api.onrender.com'),
  environment: import.meta.env.MODE || 'development'
};

export default config;