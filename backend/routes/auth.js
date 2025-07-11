const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken, generateRefreshToken, protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-20 characters and contain only letters, numbers, and underscores'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must be at least 8 characters with uppercase, lowercase, and number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { fullName, username, email, phone, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }]
    });

    if (existingUser) {
      let message = 'User already exists with this ';
      if (existingUser.email === email) message += 'email';
      else if (existingUser.username === username) message += 'username';
      else if (existingUser.phone === phone) message += 'phone number';
      
      return res.status(400).json({
        success: false,
        message
      });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      phone,
      password
    });

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/login', [
  body('identifier')
    .notEmpty()
    .withMessage('Email or username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() }
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed login attempts'
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      await user.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    await user.resetLoginAttempts();

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/send-otp', [
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { phone } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this phone number'
      });
    }

    const otp = user.generateOTP();
    await user.save();

    console.log(`📱 OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        phone: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
        expiresIn: 300
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/send-registration-otp', [
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { phone } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this phone number already exists'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    if (!global.registrationOTPs) {
      global.registrationOTPs = {};
    }
    
    global.registrationOTPs[phone] = {
      otp: otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    };
    
    console.log(`📱 Registration OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully for registration',
      data: {
        phone: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
        expiresIn: 300
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send registration OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/verify-registration-otp', [
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be 6 digits'),
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-20 characters and contain only letters, numbers, and underscores'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must be at least 8 characters with uppercase, lowercase, and number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { phone, otp, fullName, username, email, password } = req.body;

    if (!global.registrationOTPs || !global.registrationOTPs[phone]) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found for this phone number. Please request a new OTP.'
      });
    }

    const storedOTPData = global.registrationOTPs[phone];
    
    if (Date.now() > storedOTPData.expiresAt) {
      delete global.registrationOTPs[phone];
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      });
    }

    if (storedOTPData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }]
    });

    if (existingUser) {
      let message = 'User already exists with this ';
      if (existingUser.email === email) message += 'email';
      else if (existingUser.username === username) message += 'username';
      else if (existingUser.phone === phone) message += 'phone number';
      
      return res.status(400).json({
        success: false,
        message
      });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      phone,
      password,
      isPhoneVerified: true
    });

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    delete global.registrationOTPs[phone];

    res.status(201).json({
      success: true,
      message: 'Registration completed successfully',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/verify-otp', [
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be 6 digits')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const isOTPValid = user.verifyOTP(otp);

    if (!isOTPValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    user.phoneVerificationOTP = undefined;
    user.otpExpiry = undefined;
    user.isPhoneVerified = true;
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.phoneVerificationOTP;
    delete userResponse.otpExpiry;

    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'OTP verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('coursesEnrolled', 'title thumbnail category level')
      .populate('coursesCompleted', 'title thumbnail category level');

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/refresh', [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { refreshToken } = req.body;

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    const newToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

router.post('/refresh-token', [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { refreshToken } = req.body;

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    const newToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

router.post('/logout', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/send-signup-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this phone number already exists' 
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    global.signupOTPs = global.signupOTPs || {};
    global.signupOTPs[phone] = { otp, expiresAt: Date.now() + 300000 };
    
    console.log(`📱 Signup OTP for ${phone}: ${otp}`);
    
    res.json({ 
      success: true, 
      message: 'OTP sent successfully', 
      data: {
        phone: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
        expiresIn: 300
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/verify-signup-otp', async (req, res) => {
  try {
    const { phone, otp, fullName, username, email, password } = req.body;
    
    if (!phone || !otp || !fullName || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone, OTP, full name, and password are required' 
      });
    }

    const storedOTP = global.signupOTPs?.[phone];

    if (!storedOTP) {
      return res.status(400).json({ 
        success: false, 
        message: 'No OTP found for this phone number. Please request a new OTP.' 
      });
    }

    if (storedOTP.otp !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP. Please try again.' 
      });
    }

    if (Date.now() > storedOTP.expiresAt) {
      delete global.signupOTPs[phone];
      return res.status(400).json({ 
        success: false, 
        message: 'OTP has expired. Please request a new OTP.' 
      });
    }

    const finalUsername = username;
    const finalEmail = email || null;

    const existingUserQuery = [{ phone }];
    if (finalUsername) existingUserQuery.push({ username: finalUsername });
    if (finalEmail) existingUserQuery.push({ email: finalEmail });

    const existingUser = await User.findOne({
      $or: existingUserQuery
    });

    if (existingUser) {
      let message = 'User already exists with this ';
      if (existingUser.phone === phone) message += 'phone number';
      else if (existingUser.username === finalUsername) message += 'username';
      else if (existingUser.email === finalEmail) message += 'email';
      
      return res.status(400).json({
        success: false,
        message
      });
    }

    const userData = {
      fullName,
      username: finalUsername,
      phone,
      password,
      isPhoneVerified: true
    };

    if (finalEmail) {
      userData.email = finalEmail;
    }

    const user = await User.create(userData);

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    delete global.signupOTPs[phone];

    res.status(201).json({ 
      success: true, 
      message: 'Signup successful', 
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Signup failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/send-login-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number is required' 
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'No account found with this phone number' 
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    global.loginOTPs = global.loginOTPs || {};
    global.loginOTPs[phone] = { otp, expiresAt: Date.now() + 300000 };

    console.log(`📱 Login OTP for ${phone}: ${otp}`);
    
    res.json({ 
      success: true, 
      message: 'OTP sent successfully', 
      data: {
        phone: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
        expiresIn: 300
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/send-email-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this email already exists' 
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    global.emailOTPs = global.emailOTPs || {};
    global.emailOTPs[email] = { otp, expiresAt: Date.now() + 300000 };

    // Send OTP email using nodemailer utility
    const sendEmailOtp = require('../utils/sendEmailOtp');
    try {
      await sendEmailOtp(email, otp);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
      });
    }

    res.json({ 
      success: true, 
      message: 'OTP sent successfully to your email', 
      data: {
        email: email.replace(/(.{2}).*(@.*)/, '$1****$2'),
        expiresIn: 300
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.post('/verify-email-otp', async (req, res) => {
  try {
    
    let { email, otp, fullName, username, password } = req.body;
    email = (email || '').trim().toLowerCase();
    otp = (otp || '').toString().trim();

    if (!email || !otp || !fullName || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, OTP, full name, and password are required' 
      });
    }

    const storedOTP = global.emailOTPs?.[email];

    if (!storedOTP) {
      return res.status(400).json({ 
        success: false, 
        message: 'No OTP found for this email. Please request a new OTP.' 
      });
    }

    if ((storedOTP.otp || '').toString().trim() !== otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid OTP. Please try again.' 
      });
    }

    if (Date.now() > storedOTP.expiresAt) {
      delete global.emailOTPs[email];
      return res.status(400).json({ 
        success: false, 
        message: 'OTP has expired. Please request a new OTP.' 
      });
    }

    const finalUsername = username;
    const finalEmail = email;

    const existingUserQuery = [];
    if (finalUsername) existingUserQuery.push({ username: finalUsername });
    if (finalEmail) existingUserQuery.push({ email: finalEmail });

    if (existingUserQuery.length > 0) {
      const existingUser = await User.findOne({
        $or: existingUserQuery
      });

      if (existingUser) {
        let message = 'User already exists with this ';
        if (existingUser.username === finalUsername) message += 'username';
        else if (existingUser.email === finalEmail) message += 'email';
        
        return res.status(400).json({
          success: false,
          message
        });
      }
    }

    const userData = {
      fullName,
      username: finalUsername,
      email: finalEmail,
      password,
      isEmailVerified: true
    };

    const user = await User.create(userData);

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    delete global.emailOTPs[email];

    res.status(201).json({ 
      success: true, 
      message: 'Email signup successful', 
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Email signup failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;