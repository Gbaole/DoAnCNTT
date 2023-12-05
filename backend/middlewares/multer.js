const multer = require('multer');
const path = require('path');

// Set storage engine for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 512 }, // 512MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('image', 20); // accept up to 20  images

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only! (jpeg, jpg, png, gif)');
  }
}

// Middleware function
function uploadMultipleImages(req, res, next) {
  // console.log(`${req.files.image.length} files`);
  // console.log(req.files.image);
  if (req.files.image.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  upload(req, res, function (err) {
    if (err) {
      // Multer error
      console.log(err);
      return res.status(400).json({ message: err });
    } else {
      // Files uploaded successfully
      next();
    }
  });
}

module.exports = uploadMultipleImages;
