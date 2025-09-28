import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

console.log('🔍 Iniciando configuração do Cloudinary...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '*** Configurada ***' : 'Não configurada');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '*** Configurada ***' : 'Não configurada');

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log('📤 Iniciando upload para Cloudinary...');
    console.log('Arquivo:', file.originalname);
    console.log('Tipo:', file.mimetype);
    
    // Determina formato baseado no tipo do arquivo
    let format = 'jpg'; // padrão
    if (file.mimetype.includes('png')) format = 'png';
    if (file.mimetype.includes('gif')) format = 'gif';
    if (file.mimetype.includes('webp')) format = 'webp';

    const params = {
      folder: 'rj-api',
      format: format,
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
    };

    console.log('📁 Parâmetros Cloudinary:', params);
    return params;
  },
});

// Adiciona log quando o upload é completado
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

console.log('✅ Multer configurado com Cloudinary Storage');

export default upload;