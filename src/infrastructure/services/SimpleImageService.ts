// src/infrastructure/services/SimpleImageService.ts
import { Client } from 'basic-ftp';
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
    if (process.env.NODE_ENV !== 'production' || !process.env.FTP_HOST) {
      console.log('🛠️  Modo desenvolvimento - usando filenames locais');
      return files ? files.map((file) => file.filename) : [];
    }

    console.log('🚀 Modo produção - iniciando upload FTP seguro');
    const uploadedUrls: string[] = [];

    for (const file of files || []) {
      try {
        this.validateFile(file);
        const ftpUrl = await this.uploadToFTP(file);
        uploadedUrls.push(ftpUrl ?? file.filename);
      } catch (error) {
        console.error('❌ Erro no upload FTP - fallback local:', error);
        uploadedUrls.push(file.filename);
      }
    }

    return uploadedUrls;
  }

  private static async uploadToFTP(
    file: Express.Multer.File
  ): Promise<string | null> {
    const client = new Client();
    client.ftp.verbose = true;

    try {
      console.log('🔐 Conectando ao FTP...');
      await client.access({
        host: process.env.FTP_HOST!,
        user: process.env.FTP_USER!,
        password: process.env.FTP_PASSWORD!,
        secure: false,
      });

      console.log('✅ Conectado ao FTP');

      // 🧭 Detecta o diretório atual apenas para log
      const pwd = await client.pwd();
      console.log(`📍 Diretório atual do FTP: ${pwd}`);

      // 📁 Caminho absoluto onde a pasta uploads já existe
      const remotePath = `/www/redefinindojornadas/uploads/${file.filename}`;

      console.log(`📤 Enviando arquivo para: ${remotePath}`);
      await client.uploadFrom(file.path, remotePath);

      console.log(`✅ Upload concluído com sucesso: ${remotePath}`);

      const imageUrl = `https://redefinindojornadas.infocimol.com.br/uploads/${file.filename}`;
      console.log(`🌍 URL pública da imagem: ${imageUrl}`);

      return imageUrl;
    } catch (error) {
      console.error('❌ Erro no upload FTP:', error);
      return null;
    } finally {
      client.close();
    }
  }

  private static validateFile(file: Express.Multer.File): void {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!this.ALLOWED_EXTENSIONS.includes(ext))
      throw new Error(`Tipo de arquivo não permitido: ${ext}`);
    if (file.size > this.MAX_FILE_SIZE)
      throw new Error(`Arquivo muito grande: ${file.size} bytes`);
    if (!file.mimetype.startsWith('image/'))
      throw new Error('Arquivo não é uma imagem válida');
    if (!fs.existsSync(file.path))
      throw new Error('Arquivo temporário não encontrado');
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
