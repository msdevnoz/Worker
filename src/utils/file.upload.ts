import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname; 
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export const fileUploadMiddleware = upload.single('photo');

export const getFileUploadPath = (filename: string): string => {
  return `uploads/${filename}`;
};
