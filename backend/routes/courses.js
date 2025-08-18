const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all courses with filtering and pagination
// @route   GET /api/courses
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isString().withMessage('Category must be a string'),
  query('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid level'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('sortBy').optional().isIn(['title', 'createdAt', 'enrolledStudents', 'averageRating', 'price']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 12,
      category,
      level,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minPrice,
      maxPrice,
      isFree
    } = req.query;

    const filter = { isPublished: true, isActive: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (isFree === 'true') filter.isFree = true;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const courses = await Course.find(filter)
      .populate('instructor', 'fullName avatar')
      .select('-videos') 
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCourses = await Course.countDocuments(filter);
    const totalPages = Math.ceil(totalCourses / parseInt(limit));

    if (req.user) {
      const userEnrollments = await Enrollment.find({
        user: req.user._id,
        course: { $in: courses.map(c => c._id) }
      }).select('course status progress');

      courses.forEach(course => {
        const enrollment = userEnrollments.find(e => e.course.toString() === course._id.toString());
        course._doc.enrollmentStatus = enrollment ? {
          isEnrolled: true,
          status: enrollment.status,
          progress: enrollment.progress
        } : { isEnrolled: false };
      });
    }

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCourses,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Get single course by ID or slug
// @route   GET /api/courses/:identifier
// @access  Public
router.get('/:identifier', optionalAuth, async (req, res) => {
  try {
    const { identifier } = req.params;

    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);
    const filter = isObjectId ? { _id: identifier } : { slug: identifier };
    filter.isPublished = true;
    filter.isActive = true;

    const course = await Course.findOne(filter)
      .populate('instructor', 'fullName avatar bio');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    let enrollmentData = null;
    if (req.user) {
      const enrollment = await Enrollment.findOne({
        user: req.user._id,
        course: course._id
      });

      if (enrollment) {
        enrollmentData = {
          isEnrolled: true,
          status: enrollment.status,
          progress: enrollment.progress,
          watchedVideos: enrollment.watchedVideos,
          bookmarkedVideos: enrollment.bookmarkedVideos,
          notes: enrollment.notes
        };
      }
    }

    let courseResponse = course.toObject();
    res.json({
      success: true,
      data: {
        course: courseResponse,
        enrollment: enrollmentData
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Instructor/Admin)
router.post('/', [
  protect,
  authorize('instructor', 'admin'),
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 20, max: 1000 }).withMessage('Description must be between 20 and 1000 characters'),
  body('shortDescription').trim().isLength({ min: 10, max: 200 }).withMessage('Short description must be between 10 and 200 characters'),
  body('category').isIn(['Programming', 'Data Science', 'Web Development', 'Mobile Development', 'AI & ML', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Design', 'Business']).withMessage('Invalid category'),
  body('level').isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid level'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
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

    const courseData = {
      ...req.body,
      instructor: req.user._id
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { course }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Course Instructor/Admin)
router.put('/:id', [
  protect,
  authorize('instructor', 'admin'),
  body('title').optional().trim().isLength({ min: 5, max: 100 }),
  body('description').optional().trim().isLength({ min: 20, max: 1000 }),
  body('shortDescription').optional().trim().isLength({ min: 10, max: 200 }),
  body('category').optional().isIn(['Programming', 'Data Science', 'Web Development', 'Mobile Development', 'AI & ML', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Design', 'Business']),
  body('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced']),
  body('price').optional().isFloat({ min: 0 })
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

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: { course: updatedCourse }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Course Instructor/Admin)
router.delete('/:id', protect, authorize('instructor', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    course.isActive = false;
    await course.save();

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course || !course.isPublished || !course.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Course not found or not available'
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: course._id
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: course._id,
      paymentStatus: course.isFree ? 'free' : 'pending',
      enrollmentType: course.isFree ? 'free' : 'paid',
      paymentAmount: course.isFree ? 0 : course.discountPrice
    });

    // Update course enrollment count
    course.enrolledStudents += 1;
    await course.save();

    // Update user enrolled courses
    req.user.coursesEnrolled.push(course._id);
    await req.user.save();

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: { enrollment }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to enroll in course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
