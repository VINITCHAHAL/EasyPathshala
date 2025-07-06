const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    minlength: [5, 'Course title must be at least 5 characters long'],
    maxlength: [100, 'Course title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    minlength: [20, 'Course description must be at least 20 characters long'],
    maxlength: [1000, 'Course description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  
  thumbnail: {
    type: String,
    required: [true, 'Course thumbnail is required'],
    default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop'
  },
  previewVideo: {
    type: String, 
  },
  videos: [{
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  }],
  
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: {
      values: ['Programming', 'Data Science', 'Web Development', 'Mobile Development', 
               'AI & ML', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Design', 'Business'],
      message: 'Please select a valid category'
    }
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced'],
      message: 'Please select a valid level'
    }
  },
  language: {
    type: String,
    required: [true, 'Course language is required'],
    default: 'English'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Course instructor is required']
  },
  
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  discount: {
    type: Number,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  isFree: {
    type: Boolean,
    default: false
  },
  
  totalDuration: {
    type: Number,
    default: 0
  },
  totalLessons: {
    type: Number,
    default: 0
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  completedStudents: {
    type: Number,
    default: 0
  },
  
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  
  requirements: [{
    type: String,
    trim: true
  }],
  outcomes: [{
    type: String,
    trim: true
  }],
  
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  
  features: [{
    type: String,
    trim: true
  }],
  
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

courseSchema.pre('save', function(next) {
  if (this.isModified('videos')) {
    this.totalDuration = this.videos.reduce((total, video) => total + video.duration, 0);
    this.totalLessons = this.videos.length;
  }
  next();
});

courseSchema.virtual('discountPrice').get(function() {
  if (this.discount > 0) {
    return this.price - (this.price * this.discount / 100);
  }
  return this.price;
});

courseSchema.virtual('completionRate').get(function() {
  if (this.enrolledStudents === 0) return 0;
  return (this.completedStudents / this.enrolledStudents) * 100;
});

courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ price: 1 });
courseSchema.index({ averageRating: -1 });
courseSchema.index({ enrolledStudents: -1 });
courseSchema.index({ createdAt: -1 });
courseSchema.index({ slug: 1 });

module.exports = mongoose.model('Course', courseSchema);