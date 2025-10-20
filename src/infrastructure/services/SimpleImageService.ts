// src/infrastructure/services/SimpleImageService.ts
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';

export class SimpleImageService {
  private static readonly ALLOWED_EXTENSIONS = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
  ];
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  static async handleProductionUpload(
    files?: Express.Multer.File[]
  ): Promise<string[]> {
    if (!files || files.length === 0) return [];

    // Em desenvolvimento: apenas retorna os nomes
    if (
      process.env.NODE_ENV !== 'production' ||
      !process.env.CLOUDINARY_CLOUD_NAME
    ) {
      console.log('🛠️  Modo desenvolvimento - usando filenames locais');
      return files.map((file) => file.filename);
    }

    console.log('🚀 Modo produção - iniciando upload Cloudinary seguro');

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        this.validateFile(file);

        // 🔄 Copia o arquivo para /tmp antes de enviar
        const tmpPath = await this.ensureTmpCopy(file);

        const cloudinaryUrl = await this.uploadToCloudinary(tmpPath);
        uploadedUrls.push(cloudinaryUrl);

        console.log(`✅ Upload Cloudinary concluído: ${cloudinaryUrl}`);

        // Apaga o arquivo temporário após o upload
        fs.unlink(tmpPath, () => {});
      } catch (error) {
        console.error(
          '❌ Erro no upload Cloudinary, usando fallback local:',
          error
        );
        uploadedUrls.push(file.filename);
      }
    }

    return uploadedUrls;
  }

  /**
   * Copia o arquivo original para /tmp para garantir leitura no Render
   */
  private static async ensureTmpCopy(
    file: Express.Multer.File
  ): Promise<string> {
    const tmpDir = '/tmp';
    const tmpPath = path.join(tmpDir, path.basename(file.path));

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    await fs.promises.copyFile(file.path, tmpPath);
    console.log(`📂 Arquivo copiado para temporário: ${tmpPath}`);
    return tmpPath;
  }

  /**
   * Upload seguro via caminho de arquivo
   */
  private static async uploadToCloudinary(filePath: string): Promise<string> {
    console.log('📤 Enviando arquivo para Cloudinary:', filePath);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        filePath,
        {
          folder: 'redefinindojornadas',
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('❌ Erro no Cloudinary:', error);
            reject(new Error(`Falha no upload Cloudinary: ${error.message}`));
          } else {
            resolve(result!.secure_url);
          }
        }
      );
    });
  }

  /**
   * Validação de segurança
   */
  private static validateFile(file: Express.Multer.File): void {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!this.ALLOWED_EXTENSIONS.includes(ext)) {
      throw new Error(`Tipo de arquivo não permitido: ${ext}`);
    }
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(`Arquivo muito grande: ${file.size} bytes`);
    }
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Arquivo não é uma imagem válida');
    }
    if (!fs.existsSync(file.path)) {
      throw new Error('Arquivo temporário não encontrado');
    }
    console.log(
      `✅ Arquivo validado: ${file.originalname} (${file.size} bytes)`
    );
  }

  static resolveImageUrl(filenameOrUrl: string): string {
    if (filenameOrUrl.startsWith('http')) return filenameOrUrl;
    const baseURL = process.env.API_URL || 'http://localhost:3000';
    return `${baseURL}/uploads/${filenameOrUrl}`;
  }
}
