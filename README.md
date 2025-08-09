# 🎓 EasyPathshala

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Learn Wisely, Grow Mindfully** - Experience the perfect blend of traditional wisdom and modern learning with our expert-guided pathshala designed for today's learners.

## 🌟 Overview

EasyPathshala is a modern full-stack e-learning platform that bridges the gap between traditional teaching methods and contemporary digital learning. Built with React frontend and Node.js/Express backend, it offers an interactive and engaging learning experience with user authentication, course management, and high-quality video content.

### ✨ Key Features

- 🎥 **Interactive Video Learning** - High-quality courses with expert instructors
- 🔐 **User Authentication** - Secure registration, login, and profile management
- 🔍 **Smart Search** - Advanced search functionality with suggestions and history
- 📱 **Responsive Design** - Seamless experience across all devices
- 🏆 **Course Management** - Complete CRUD operations for courses
- 👨‍🏫 **Expert Instructors** - Learn from experienced professionals
- 📊 **Progress Tracking** - Monitor your learning journey
- 🎨 **Modern UI/UX** - Beautiful gradient designs with smooth animations
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🚀 **Serverless Deployment** - Deployed on Vercel with serverless functions

## 🏗️ Architecture

### Frontend
- **Framework:** React 19.1.0 with Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Authentication:** JWT tokens with refresh mechanism

### Backend
- **Runtime:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcrypt password hashing
- **File Upload:** Multer middleware
- **Security:** Helmet, CORS, Rate limiting

### Deployment
- **Frontend & Backend:** Vercel (Serverless functions)
- **Database:** MongoDB Atlas
- **Environment:** Production-ready with environment variables

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/EasyPathshala.git
   cd EasyPathshala
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_token_secret
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```

5. **Start the development servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.1.0
- **Build Tool:** Vite 4.5.0
- **Styling:** Tailwind CSS 3.4.0
- **Routing:** React Router DOM 6.30.1
- **Video Player:** React Player 3.0.0
- **Icons:** Lucide React 0.525.0
- **HTTP Client:** Fetch API
- **Linting:** ESLint

### Backend
- **Runtime:** Node.js 18.x
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcryptjs
- **Validation:** Express Validator
- **File Upload:** Multer
- **Security:** Helmet, CORS, Express Rate Limit
- **Environment:** dotenv

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `POST /api/courses` - Create new course (authenticated)
- `PUT /api/courses/:id` - Update course (authenticated)
- `DELETE /api/courses/:id` - Delete course (authenticated)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/courses` - Get user's enrolled courses

### Health Check
- `GET /api/health` - API health status

## 🚀 Deployment

### Vercel Deployment (Recommended)

The application is configured for seamless Vercel deployment with serverless functions:

1. **Environment Variables Setup**
   In your Vercel dashboard, add these environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_token_secret
   CLIENT_URL=https://your-app-name.vercel.app
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Automatic Deployment**
   Connect your GitHub repository to Vercel for automatic deployments on push.

### 🔧 Recent Fixes

#### 404 Error Resolution
Recently fixed a critical 404 error that was occurring during user registration:

**Problem:** The frontend was trying to make API calls to an external service that wasn't properly deployed.

**Solution:** 
- Updated `vercel.json` to use Vercel serverless functions instead of external API proxy
- Modified `backend/server.js` to support both local development and Vercel deployment
- Ensured proper routing configuration for API endpoints

**Technical Details:**
- Changed from external proxy to local serverless functions
- Added environment detection for Vercel vs local development
- Maintained backward compatibility for local development

## 🎯 Available Routes

### Frontend Routes
- **`/`** - Home page with featured courses and search
- **`/courses`** - Complete courses catalog with filtering
- **`/about`** - About page with platform information
- **`/login`** - User login page
- **`/register`** - User registration page
- **`/video/:videoId`** - Individual video player page

### API Routes
- **`/api/auth/*`** - Authentication endpoints
- **`/api/courses/*`** - Course management endpoints
- **`/api/users/*`** - User management endpoints
- **`/api/health`** - Health check endpoint

## 🎨 Features in Detail

### 🔐 Authentication System
- JWT-based authentication with refresh tokens
- Secure password hashing with bcrypt
- Protected routes and middleware
- User session management

### 🏠 Homepage
- Hero section with engaging gradients and statistics
- Featured courses showcase
- Smart search with real-time suggestions
- Interactive course cards with hover effects

### 📚 Courses Management
- Complete CRUD operations for courses
- Advanced filtering by category and level
- Search integration with backend API
- File upload for course materials

### 🎬 Video Player
- Full-featured video player using React Player
- Course information and instructor details
- Related courses suggestions
- Progress tracking capabilities

### 🔍 Search Functionality
- Real-time search suggestions
- Search history tracking
- Category-based filtering
- Backend-powered search results

## 🛡️ Security Features

- **Authentication:** JWT tokens with expiration
- **Password Security:** bcrypt hashing
- **Rate Limiting:** Express rate limit middleware
- **CORS Protection:** Configured for production
- **Input Validation:** Express validator middleware
- **Helmet Security:** Security headers protection

## 📊 Course Categories

- React Development
- JavaScript Programming
- CSS & Styling
- Node.js Backend
- Python Programming
- Database Management
- Cloud Computing
- DevOps Practices

## 🎯 Learning Levels

- **Beginner** - Perfect for newcomers
- **Intermediate** - For those with some experience
- **Advanced** - Expert-level content

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Code Quality

The project uses ESLint with React-specific rules to maintain code quality and consistency.

### Environment Variables

**Development (.env in backend/):**
```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/easypathshala
JWT_SECRET=your_development_jwt_secret
JWT_REFRESH_SECRET=your_development_refresh_secret
CLIENT_URL=http://localhost:5173
PORT=5000
```

**Production (Vercel Environment Variables):**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/easypathshala
JWT_SECRET=your_production_jwt_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
CLIENT_URL=https://your-app.vercel.app
```

## 🐛 Troubleshooting

### Common Issues

1. **404 API Errors**
   - Ensure environment variables are properly set
   - Check that MongoDB connection is established
   - Verify API routes are correctly mounted

2. **Authentication Issues**
   - Check JWT secret configuration
   - Verify token storage in localStorage
   - Ensure CORS is properly configured

3. **Database Connection**
   - Verify MongoDB URI format
   - Check network access in MongoDB Atlas
   - Ensure database user permissions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add proper error handling and validation
- Include appropriate comments for complex logic
- Test both frontend and backend changes
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vinit Choudhary** - Founder & Full-Stack Developer

## 🙏 Acknowledgments

- Thanks to all the expert instructors contributing to the platform
- React community for excellent documentation and tools
- Express.js and MongoDB communities for robust backend solutions
- Tailwind CSS for the amazing utility-first framework
- Vercel for seamless deployment experience
- All contributors and learners who make this platform better

## 📞 Support

If you have any questions or need support:

- 📧 Email: vinitchahal1241@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/EasyPathshala/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/EasyPathshala/discussions)

## 🔄 Recent Updates

- ✅ Fixed 404 API errors in production deployment
- ✅ Implemented Vercel serverless functions for backend
- ✅ Added comprehensive authentication system
- ✅ Enhanced security with multiple middleware layers
- ✅ Improved deployment configuration and documentation

---

<div align="center">
  <p>Made with ❤️ for the learning community</p>
   <p> <b>Developed By ❤️  Vinit Kumar Choudhary </b> </p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p>💻 Built with React + Node.js + MongoDB</p>
  <p>🚀 Deployed on Vercel</p>
  <p>❤️ Developed By Vinit Kumar Choudhary</p>
</div>
