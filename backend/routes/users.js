const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'User routes are working!',
    timestamp: new Date().toISOString()
  });
});

router.get('/profile', (req, res) => {
  res.json({
    success: true,
    message: 'User profile endpoint - coming soon!'
  });
});

module.exports = router;
