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

  /**
   * Processa uploads de forma segura - apenas para produção com Cloudinary
   */
  static async handleProductionUpload(
    files?: Express.Multer.File[]
  ): Promise<string[]> {
    // ⚠️ EM DESENVOLVIMENTO: retorna filename normal (comportamento atual)
    if (
      process.env.NODE_ENV !== 'production' ||
      !process.env.CLOUDINARY_CLOUD_NAME
    ) {
      console.log('🛠️  Modo desenvolvimento - usando filenames locais');
      return files ? files.map((file) => file.filename) : [];
    }

    console.log('🚀 Modo produção - iniciando upload Cloudinary seguro');

    if (!files || files.length === 0) return [];

    // Configura Cloudinary uma vez
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadedUrls: string[] = [];
    const filesArray = files;

    for (const file of filesArray) {
      try {
        // ✅ VALIDAÇÕES DE SEGURANÇA
        this.validateFile(file);

        // 🔐 UPLOAD SEGURO PARA CLOUDINARY
        const cloudinaryUrl = await this.uploadToCloudinary(file);
        uploadedUrls.push(cloudinaryUrl);

        console.log(`✅ Upload Cloudinary realizado: ${cloudinaryUrl}`);
      } catch (error) {
        console.error(
          '❌ Erro no upload Cloudinary, usando fallback local:',
          error
        );
        // 🔄 FALLBACK: usa filename normal
        uploadedUrls.push(file.filename);
      }
    }

    return uploadedUrls;
  }

  /**
   * 🔐 Upload seguro para Cloudinary
   */
  private static async uploadToCloudinary(
    file: Express.Multer.File
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('📤 Iniciando upload para Cloudinary...');

      // Usa upload stream para melhor performance
      const uploadStream = cloudinary.uploader.upload_stream(
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
            console.log(
              `✅ Upload Cloudinary concluído: ${result!.secure_url}`
            );
            resolve(result!.secure_url);
          }
        }
      );

      // Envia o buffer do arquivo
      uploadStream.end(file.buffer);
    });
  }

  /**
   * 🔐 Validações de segurança rigorosas
   */
  private static validateFile(file: Express.Multer.File): void {
    // Verifica extensão
    const ext = path.extname(file.originalname).toLowerCase();
    if (!this.ALLOWED_EXTENSIONS.includes(ext)) {
      throw new Error(`Tipo de arquivo não permitido: ${ext}`);
    }

    // Verifica tamanho
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(
        `Arquivo muito grande: ${file.size} bytes (max: ${this.MAX_FILE_SIZE})`
      );
    }

    // Verifica se é imagem
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Arquivo não é uma imagem válida');
    }

    // Verifica se o arquivo temporário existe
    if (!fs.existsSync(file.path)) {
      throw new Error('Arquivo temporário não encontrado');
    }

    console.log(
      `✅ Arquivo validado: ${file.originalname} (${file.size} bytes)`
    );
  }

  /**
   * Função auxiliar para manter compatibilidade
   */
  static resolveImageUrl(filenameOrUrl: string): string {
    // Se já é URL completa (vinda do Cloudinary), usa como está
    if (filenameOrUrl.startsWith('http')) {
      return filenameOrUrl;
    }

    // Se é filename, monta URL local (desenvolvimento)
    const baseURL = process.env.API_URL || 'http://localhost:3000';
    return `${baseURL}/uploads/${filenameOrUrl}`;
  }
}
