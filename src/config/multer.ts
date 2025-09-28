import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
  '🔑 Cloudinary configurado para cloud:',
  process.env.CLOUDINARY_CLOUD_NAME
);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determina formato baseado no tipo do arquivo
    let format = 'jpg'; // padrão
    if (file.mimetype.includes('png')) format = 'png';
    if (file.mimetype.includes('gif')) format = 'gif';
    if (file.mimetype.includes('webp')) format = 'webp';

    return {
      folder: 'rj-api', // Pasta no Cloudinary
      format: format,
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
