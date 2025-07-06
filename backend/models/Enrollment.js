const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required for enrollment']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required for enrollment']
  },
  
  status: {
    type: String,
    enum: {
      values: ['enrolled', 'in-progress', 'completed', 'dropped', 'suspended'],
      message: 'Invalid enrollment status'
    },
    default: 'enrolled'
  },
  
  progress: {
    type: Number,
    default: 0,
    min: [0, 'Progress cannot be negative'],
    max: [100, 'Progress cannot exceed 100%']
  },
  watchedVideos: [{
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    watchedAt: {
      type: Date,
      default: Date.now
    },
    watchTime: {
      type: Number, 
      default: 0
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }],
  
  totalWatchTime: {
    type: Number, 
    default: 0
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  
  completedAt: Date,
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  },
  
  paymentStatus: {
    type: String,
    enum: ['free', 'paid', 'pending', 'failed'],
    default: 'free'
  },
  paymentId: String,
  paymentAmount: {
    type: Number,
    default: 0
  },
  
  enrollmentType: {
    type: String,
    enum: ['free', 'paid', 'gift', 'scholarship'],
    default: 'free'
  },
  enrollmentSource: {
    type: String,
    enum: ['website', 'mobile', 'admin', 'bulk'],
    default: 'website'
  },
  
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  review: {
    type: String,
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  reviewedAt: Date,
  
  bookmarkedVideos: [{
    videoId: mongoose.Schema.Types.ObjectId,
    bookmarkedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    videoId: mongoose.Schema.Types.ObjectId,
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Note cannot exceed 1000 characters']
    },
    timestamp: {
      type: Number, 
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  expiresAt: Date,
  isLifetimeAccess: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

enrollmentSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

enrollmentSchema.virtual('daysSinceEnrollment').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

enrollmentSchema.pre('save', async function(next) {
  if (this.isModified('watchedVideos')) {
  
    const course = await mongoose.model('Course').findById(this.course);
    if (course && course.totalLessons > 0) {
      const completedVideos = this.watchedVideos.filter(v => v.isCompleted).length;
      this.progress = Math.round((completedVideos / course.totalLessons) * 100);
      
      if (this.progress === 100 && this.status !== 'completed') {
        this.status = 'completed';
        this.completedAt = new Date();
      } else if (this.progress > 0 && this.status === 'enrolled') {
        this.status = 'in-progress';
      }
    }
  }
  next();
});

enrollmentSchema.pre('save', function(next) {
  if (this.isModified('watchedVideos')) {
    this.totalWatchTime = this.watchedVideos.reduce((total, video) => {
      return total + (video.watchTime || 0);
    }, 0) / 60; 
  }
  next();
});

enrollmentSchema.methods.addWatchedVideo = function(videoId, watchTime, isCompleted = false) {
  const existingVideo = this.watchedVideos.find(v => v.videoId.toString() === videoId.toString());
  
  if (existingVideo) {
    existingVideo.watchTime = Math.max(existingVideo.watchTime, watchTime);
    existingVideo.isCompleted = existingVideo.isCompleted || isCompleted;
    existingVideo.watchedAt = new Date();
  } else {
    this.watchedVideos.push({
      videoId,
      watchTime,
      isCompleted,
      watchedAt: new Date()
    });
  }
  
  this.lastAccessedAt = new Date();
  return this.save();
};

enrollmentSchema.methods.addBookmark = function(videoId) {
  const existingBookmark = this.bookmarkedVideos.find(b => b.videoId.toString() === videoId.toString());
  
  if (!existingBookmark) {
    this.bookmarkedVideos.push({
      videoId,
      bookmarkedAt: new Date()
    });
    return this.save();
  }
  
  return Promise.resolve(this);
};

enrollmentSchema.methods.addNote = function(videoId, content, timestamp = 0) {
  this.notes.push({
    videoId,
    content,
    timestamp,
    createdAt: new Date()
  });
  return this.save();
};

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ user: 1, status: 1 });
enrollmentSchema.index({ course: 1, status: 1 });
enrollmentSchema.index({ createdAt: -1 });
enrollmentSchema.index({ lastAccessedAt: -1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);