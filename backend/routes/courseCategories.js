const express = require('express');
const router = express.Router();
const CourseCategory = require('../models/CourseCategory'); // adjust if needed

// @desc    Get all course categories
// @route   GET /api/course-categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const categories = await CourseCategory.find();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (err) {
    console.error('Failed to fetch course categories:', err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;
