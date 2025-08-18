const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.CLIENT_URL, 'https://easy-pathshala.vercel.app'] 
    : true,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 100 : 1000
});
app.use('/api/', limiter);

const connectDB = require('./config/database');
connectDB();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.get('/api/health', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const dbName = mongoose.connection.name || 'unknown';
    const dbHost = mongoose.connection.host || 'unknown';
    
    const systemInfo = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version,
      pid: process.pid
    };

    res.status(200).json({
      success: true,
      message: 'EasyPathshala API is running!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStatus,
        name: dbName,
        host: dbHost
      },
      system: systemInfo,
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        courses: '/api/courses'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/health/db', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    const admin = mongoose.connection.db.admin();
    const result = await admin.ping();
    
    res.status(200).json({
      success: true,
      message: 'Database connection is healthy',
      database: {
        status: 'connected',
        name: mongoose.connection.name,
        host: mongoose.connection.host,
        ping: result,
        collections: (await mongoose.connection.db.listCollections().toArray()).length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'production' ? 'Database error' : error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/health/endpoints', async (req, res) => {
  const endpoints = [
    { name: 'Auth - Login', path: '/api/auth/login', method: 'POST' },
    { name: 'Auth - Register', path: '/api/auth/register', method: 'POST' },
    { name: 'Users', path: '/api/users', method: 'GET' },
    { name: 'Courses', path: '/api/courses', method: 'GET' }
  ];

  res.status(200).json({
    success: true,
    message: 'Available API endpoints',
    endpoints: endpoints,
    baseUrl: `${req.protocol}://${req.get('host')}`,
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`💻 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});
