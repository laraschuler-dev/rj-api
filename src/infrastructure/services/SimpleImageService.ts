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

  /**
   * Processa uploads de forma segura - apenas para produção com FTP
   */
  static async handleProductionUpload(
    files?: Express.Multer.File[]
  ): Promise<string[]> {
    // ⚙️ Desenvolvimento: retorna filename local
    if (process.env.NODE_ENV !== 'production' || !process.env.FTP_HOST) {
      console.log('🛠️  Modo desenvolvimento - usando filenames locais');
      return files ? files.map((file) => file.filename) : [];
    }

    console.log('🚀 Modo produção - iniciando upload FTP seguro');
    const uploadedUrls: string[] = [];
    const filesArray = files || [];

    for (const file of filesArray) {
      try {
        this.validateFile(file);

        // 🔐 Upload direto para o FTP do subdomínio
        const ftpUrl = await this.uploadToFTP(file);

        if (ftpUrl) {
          uploadedUrls.push(ftpUrl);
          console.log(`✅ Upload seguro realizado: ${ftpUrl}`);
        } else {
          console.log('⚠️  Falha no FTP - usando fallback local');
          uploadedUrls.push(file.filename);
        }
      } catch (error) {
        console.error('❌ Erro no upload FTP - fallback local:', error);
        uploadedUrls.push(file.filename);
      }
    }

    return uploadedUrls;
  }

  /**
   * 🔐 Upload direto para o FTP do subdomínio
   */
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

      // 📌 Diretório raiz do subdomínio já é "redefinindojornadas"
      // portanto, só precisamos acessar a pasta "uploads"
      const ftpUploadsDir = 'uploads';
      const remotePath = `${ftpUploadsDir}/${file.filename}`;

      console.log(`📤 Fazendo upload para: ${remotePath}`);

      // 📁 Garante que a pasta "uploads" exista (sem recriar a raiz)
      try {
        await client.ensureDir(ftpUploadsDir);
      } catch (err) {
        console.log(
          '⚠️ Não foi possível garantir diretório uploads (possivelmente já existe):',
          err
        );
      }

      // 🔄 Volta à raiz antes de subir o arquivo
      await client.cd('/');

      // 📤 Faz upload do arquivo
      await client.uploadFrom(file.path, remotePath);

      console.log(`✅ Upload concluído: ${remotePath}`);

      // 🌍 Gera URL pública com base no subdomínio existente
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

  /**
   * 🔒 Validação de segurança dos arquivos
   */
  private static validateFile(file: Express.Multer.File): void {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!this.ALLOWED_EXTENSIONS.includes(ext)) {
      throw new Error(`Tipo de arquivo não permitido: ${ext}`);
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(
        `Arquivo muito grande: ${file.size} bytes (max: ${this.MAX_FILE_SIZE})`
      );
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

  /**
   * Compatibilidade: resolve URLs locais ou completas
   */
  static resolveImageUrl(filenameOrUrl: string): string {
    if (filenameOrUrl.startsWith('http')) {
      return filenameOrUrl;
    }

    const baseURL = process.env.API_URL || 'http://localhost:3000';
    return `${baseURL}/uploads/${filenameOrUrl}`;
  }
}
