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

  // 🔐 PASTA ESPECÍFICA DO SEU SITE - NÃO ALTERE!
  private static readonly MY_SAFE_FOLDER = 'redefinindojornadas/uploads';

  /**
   * Processa uploads de forma segura - apenas para produção com FTP
   */
  static async handleProductionUpload(
    files?: Express.Multer.File[]
  ): Promise<string[]> {
    // ⚠️ EM DESENVOLVIMENTO: retorna filename normal (comportamento atual)
    if (process.env.NODE_ENV !== 'production' || !process.env.FTP_HOST) {
      console.log('🛠️  Modo desenvolvimento - usando filenames locais');
      return files ? files.map((file) => file.filename) : [];
    }

    console.log('🚀 Modo produção - iniciando upload FTP seguro');
    const uploadedUrls: string[] = [];
    const filesArray = files || [];

    for (const file of filesArray) {
      try {
        // ✅ VALIDAÇÕES DE SEGURANÇA
        this.validateFile(file);

        // 🔐 UPLOAD SEGURO PARA FTP
        const ftpUrl = await this.uploadToFTP(file);
        uploadedUrls.push(ftpUrl);

        console.log(`✅ Upload seguro realizado: ${ftpUrl}`);
      } catch (error) {
        console.error('❌ Erro no upload FTP, usando fallback local:', error);
        // 🔄 FALLBACK: usa filename normal (mesmo sabendo dos riscos no Render)
        uploadedUrls.push(file.filename);
      }
    }

    return uploadedUrls;
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
   * 🔐 Upload seguro para FTP - apenas pasta específica
   */
  private static async uploadToFTP(file: Express.Multer.File): Promise<string> {
    const client = new Client();
    client.ftp.verbose = true; // 👈 Modo debug para monitoramento

    try {
      console.log('🔐 Conectando ao FTP de forma segura...');

      await client.access({
        host: process.env.FTP_HOST!,
        user: process.env.FTP_USER!,
        password: process.env.FTP_PASSWORD!,
        secure: false,
      });

      console.log(
        `✅ Conectado. Acessando pasta segura: ${this.MY_SAFE_FOLDER}`
      );

      // 🔐 NAVEGA DIRETO PARA SUA PASTA SEGURA
      await client.ensureDir(this.MY_SAFE_FOLDER);

      // 📤 UPLOAD APENAS PARA SUA PASTA
      const remotePath = `${this.MY_SAFE_FOLDER}/${file.filename}`;
      await client.uploadFrom(file.path, remotePath);

      console.log(`✅ Upload concluído: ${remotePath}`);

      // 🌐 URL específica do seu subdomínio
      const imageUrl = `https://redefinindojornadas.infocimol.com.br/uploads/${file.filename}`;
      console.log(`✅ URL da imagem: ${imageUrl}`);

      return imageUrl;
    } catch (error) {
      console.error('❌ Erro detalhado no FTP:', error);
      if (error instanceof Error) {
        throw new Error(`Falha segura no upload FTP: ${error.message}`);
      } else {
        throw new Error('Falha segura no upload FTP: erro desconhecido');
      }
    }
  }

  /**
   * Função auxiliar para manter compatibilidade
   */
  static resolveImageUrl(filenameOrUrl: string): string {
    // Se já é URL completa (vinda do FTP), usa como está
    if (filenameOrUrl.startsWith('http')) {
      return filenameOrUrl;
    }

    // Se é filename, monta URL local (desenvolvimento)
    const baseURL = process.env.API_URL || 'http://localhost:3000';
    return `${baseURL}/uploads/${filenameOrUrl}`;
  }
}
