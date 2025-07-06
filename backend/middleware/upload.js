const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;
    
    if (file.fieldname === 'thumbnail') {
      uploadPath = path.join(uploadsDir, 'thumbnails');
    } else if (file.fieldname === 'video') {
      uploadPath = path.join(uploadsDir, 'videos');
    } else if (file.fieldname === 'avatar') {
      uploadPath = path.join(uploadsDir, 'avatars');
    }
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, name);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'thumbnail' || file.fieldname === 'avatar') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for thumbnails and avatars'), false);
    }
  } else if (file.fieldname === 'video') {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  } else {
    cb(new Error('Unexpected field name'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, 
    files: 5 
  }
});

const uploadMiddleware = {
  single: (fieldName) => upload.single(fieldName),
  
  images: (fieldName, maxCount = 5) => upload.array(fieldName, maxCount),
  
  video: upload.single('video'),
  
  courseFiles: upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videos', maxCount: 20 }
  ]),
  
  avatar: upload.single('avatar')
};

const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 500MB.'
      });
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 5 files.'
      });
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected field name in file upload.'
      });
    }
  } else if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next();
};

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
  return false;
};

const generateFileUrl = (req, filePath) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const relativePath = path.relative(path.join(__dirname, '../'), filePath);
  return `${baseUrl}/${relativePath.replace(/\\/g, '/')}`;
};

module.exports = {
  uploadMiddleware,
  handleUploadError,
  deleteFile,
  generateFileUrl,
  uploadsDir
};
