import multer from 'multer';
import path from 'path';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved to 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Ensure a unique filename using the current timestamp
  },
});

// Configure multer to handle image and video fields
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10MB
});

export default upload;
