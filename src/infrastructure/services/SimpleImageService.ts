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

        // 🔐 TENTA UPLOAD APENAS NO SEU SUBDOMÍNIO
        const ftpUrl = await this.uploadToSubdomainFTP(file);

        if (ftpUrl) {
          uploadedUrls.push(ftpUrl);
          console.log(`✅ Upload seguro realizado: ${ftpUrl}`);
        } else {
          // ❌ SE NÃO CONSEGUIR NO SUBDOMÍNIO, USA FALLBACK LOCAL
          console.log(
            '⚠️  Não foi possível salvar no subdomínio, usando fallback local'
          );
          uploadedUrls.push(file.filename);
        }
      } catch (error) {
        console.error('❌ Erro no upload FTP, usando fallback local:', error);
        // 🔄 FALLBACK: usa filename normal
        uploadedUrls.push(file.filename);
      }
    }

    return uploadedUrls;
  }

  /**
   * 🔐 Upload APENAS para o seu subdomínio - ou retorna null
   */
  private static async uploadToSubdomainFTP(
    file: Express.Multer.File
  ): Promise<string | null> {
    const client = new Client();
    client.ftp.verbose = true;

    try {
      console.log('🔐 Conectando ao FTP de forma segura...');

      await client.access({
        host: process.env.FTP_HOST!,
        user: process.env.FTP_USER!,
        password: process.env.FTP_PASSWORD!,
        secure: false,
      });

      console.log('✅ Conectado ao FTP');

      // 🎯 AGORA TESTANDO COM E SEM BARRA
      const subdomainPaths = [
        '/www/redefinindojornadas/uploads', // 🔥 NOVO - ABSOLUTO
        '/public_html/redefinindojornadas/uploads', // 🔥 NOVO - ABSOLUTO
        '/redefinindojornadas/uploads', // 🔥 NOVO - ABSOLUTO
        'www/redefinindojornadas/uploads', // RELATIVO
        'public_html/redefinindojornadas/uploads', // RELATIVO
        'redefinindojornadas/uploads', // RELATIVO
      ];

      for (const path of subdomainPaths) {
        try {
          console.log(`🔄 Tentando caminho: ${path}`);

          const remotePath = `${path}/${file.filename}`;
          await client.uploadFrom(file.path, remotePath);

          console.log(`✅ Upload bem-sucedido: ${remotePath}`);

          const imageUrl = `https://redefinindojornadas.infocimol.com.br/uploads/${file.filename}`;
          console.log(`✅ URL da imagem: ${imageUrl}`);

          return imageUrl;
        } catch (uploadError) {
          const err = uploadError as Error;
          console.log(`❌ Falha no caminho: ${path}`, err.message);
          continue;
        }
      }

      console.log('🚫 Nenhum caminho funcionou.');
      return null;
    } catch (error) {
      console.error('❌ Erro geral no FTP:', error);
      return null;
    } finally {
      client.close();
    }
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
    // Se já é URL completa (vinda do FTP), usa como está
    if (filenameOrUrl.startsWith('http')) {
      return filenameOrUrl;
    }

    // Se é filename, monta URL local (desenvolvimento)
    const baseURL = process.env.API_URL || 'http://localhost:3000';
    return `${baseURL}/uploads/${filenameOrUrl}`;
  }
}
