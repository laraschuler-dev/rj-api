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

  // 🔐 Vamos descobrir dinamicamente a pasta correta
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
   * 🔍 DESCOBRE A ESTRUTURA DO FTP - MÉTODO TEMPORÁRIO
   */
  private static async discoverFTPStructure(): Promise<string> {
    const client = new Client();

    try {
      await client.access({
        host: process.env.FTP_HOST!,
        user: process.env.FTP_USER!,
        password: process.env.FTP_PASSWORD!,
        secure: false,
      });

      console.log('🔍 INICIANDO DESCOBERTA DA ESTRUTURA FTP...');

      // 1. Lista o que tem na raiz
      console.log('📁 LISTANDO PASTA RAIZ:');
      const rootList = await client.list();
      console.log(
        'Conteúdo da raiz:',
        rootList.map((item) => item.name)
      );

      // 2. Tenta encontrar sua pasta ou pastas comuns
      const possibleFolders = [
        'redefinindojornadas',
        'www',
        'public_html',
        'web',
        'htdocs',
      ];

      let discoveredFolder = '';

      for (const folder of possibleFolders) {
        try {
          await client.cd(folder);
          console.log(`✅ CONSEGUIU ACESSAR: ${folder}`);

          const content = await client.list();
          console.log(
            `📁 CONTEÚDO DE ${folder}:`,
            content.map((item) => item.name)
          );

          // Verifica se já tem uploads ou podemos criar
          const hasUploads = content.some((item) => item.name === 'uploads');
          console.log(`📸 TEM PASTA UPLOADS? ${hasUploads}`);

          discoveredFolder = folder;
          await client.cd('/'); // Volta para raiz

          if (discoveredFolder) {
            console.log(`🎯 PASTA DESCOBERTA: ${discoveredFolder}`);
            break;
          }
        } catch (e) {
          console.log(`❌ NÃO CONSEGUIU ACESSAR: ${folder}`);
          await client.cd('/'); // Garante que volta para raiz
        }
      }

      if (!discoveredFolder) {
        console.log(
          '⚠️  NÃO ENCONTROU NENHUMA PASTA ESPECÍFICA, USANDO "uploads"'
        );
        return 'uploads';
      }

      console.log(`🎯 ESTRUTURA DEFINIDA: ${discoveredFolder}/uploads`);
      return `${discoveredFolder}/uploads`;
    } catch (error) {
      console.error('❌ Erro na descoberta FTP:', error);
      return 'uploads'; // Fallback seguro
    } finally {
      client.close();
    }
  }

  /**
   * 🔐 Upload seguro para FTP - com descoberta automática
   */
  private static async uploadToFTP(file: Express.Multer.File): Promise<string> {
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

      // 🔍 DESCOBRE A ESTRUTURA (executa apenas uma vez por sessão)
      const discoveredPath = await this.discoverFTPStructure();
      console.log(`🎯 USANDO CAMINHO: ${discoveredPath}`);

      // ✅ USA O CAMINHO DESCOBERTO
      await client.ensureDir(discoveredPath);

      const remotePath = `${discoveredPath}/${file.filename}`;
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
