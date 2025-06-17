import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Caminho absoluto para a pasta uploads (raiz do projeto)
const uploadFolder = path.resolve(__dirname, '../../uploads');

// Garante que a pasta uploads exista antes de usar o multer
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req: Request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default upload;
