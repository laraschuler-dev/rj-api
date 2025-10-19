// src/infrastructure/services/SimpleImageService.ts
import { Client } from 'basic-ftp';
import path from 'path';
import fs from 'fs';

export class SimpleImageService {
  private static readonly ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  static async handleProductionUpload(files?: Express.Multer.File[]): Promise<string[]> {
    // Em dev ou sem configuração FTP, usa filenames locais
    if (process.env.NODE_ENV !== 'production' || !process.env.FTP_HOST) {
      console.log('🛠️  Modo desenvolvimento - usando filenames locais');
      return files ? files.map((file) => file.filename) : [];
    }

    console.log('🚀 Modo produção - iniciando upload FTP (seguro, sem alterações de host)...');
    const uploadedUrls: string[] = [];

    for (const file of files || []) {
      try {
        this.validateFile(file);

        // tenta o upload no FTP; se retornar null, usa fallback local (filename)
        const ftpUrl = await this.safeUploadToFTP(file);
        uploadedUrls.push(ftpUrl ?? file.filename);
      } catch (err) {
        console.error('❌ Erro no upload - fallback local:', err);
        uploadedUrls.push(file.filename);
      }
    }

    return uploadedUrls;
  }

  /**
   * Estratégia segura de upload:
   *  - tenta conectar com FTPS (secure: true); se falhar, tenta sem TLS (secure: false)
   *  - NÃO tenta criar diretórios fora do escopo do usuário
   *  - tenta entrar em 'uploads' com cd('uploads') — se falhar, não cria; faz upload no diretório atual
   */
  private static async safeUploadToFTP(file: Express.Multer.File): Promise<string | null> {
    const trySecureModes: boolean[] = [true, false]; // primeiro FTPS, depois FTP plain
    let lastError: any = null;

    for (const secureMode of trySecureModes) {
      const client = new Client();
      client.ftp.verbose = true;

      try {
        console.log(`🔐 Tentando conectar ao FTP (secure=${secureMode})...`);
        await client.access({
          host: process.env.FTP_HOST!,
          user: process.env.FTP_USER!,
          password: process.env.FTP_PASSWORD!,
          secure: secureMode,
        });

        console.log(`✅ Conectado (secure=${secureMode}).`);

        // NÃO usamos PWD como condição para escrita: alguns servidores negam PWD.
        // Tentamos entrar em uploads sem criar nada.
        let inUploads = false;
        try {
          await client.cd('uploads');
          inUploads = true;
          console.log('📂 Diretório atual: entrou em "uploads" com sucesso.');
        } catch (cdErr) {
          // Não criar ou mexer em diretórios sensíveis — apenas logar
          console.log('⚠️ Não foi possível entrar em "uploads" com cd(\'uploads\'):', (cdErr as Error).message);
          console.log('ℹ️ Não iremos criar diretório; tentaremos enviar para o diretório atual do usuário FTP.');
        }

        // Envia: se estamos dentro de uploads, envia só filename; senão, envia para o diretório atual.
        try {
          const remoteName = file.filename;
          console.log(`📤 Enviando arquivo: ${remoteName} (via secure=${secureMode})`);
          await client.uploadFrom(file.path, remoteName);
          console.log(`✅ Upload concluído: ${remoteName}`);

          // Gera URL pública usando o subdomínio público (mantém padrão)
          const imageUrl = `https://redefinindojornadas.infocimol.com.br/uploads/${file.filename}`;
          console.log(`🌍 URL esperada: ${imageUrl}`);

          client.close();
          return imageUrl;
        } catch (uploadErr) {
          console.log('❌ Falha ao enviar arquivo no modo atual (não modifica diretórios):', (uploadErr as Error).message);
          lastError = uploadErr;
          client.close();
          // Não tentamos criar dirs — passamos para próximo modo (secure=false) ou fallback
          continue;
        }
      } catch (connErr) {
        console.log(`⚠️ Conexão (secure=${secureMode}) falhou:`, (connErr as Error).message || connErr);
        lastError = connErr;
        try { client.close(); } catch { /* ignore */ }
        continue;
      }
    }

    console.error('🚫 Nenhum modo de FTP funcionou (tentamos FTPS e FTP). Último erro:', lastError);
    return null;
  }

  private static validateFile(file: Express.Multer.File): void {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!this.ALLOWED_EXTENSIONS.includes(ext)) throw new Error(`Tipo de arquivo não permitido: ${ext}`);
    if (file.size > this.MAX_FILE_SIZE) throw new Error(`Arquivo muito grande: ${file.size} bytes (max: ${this.MAX_FILE_SIZE})`);
    if (!file.mimetype.startsWith('image/')) throw new Error('Arquivo não é uma imagem válida');
    if (!fs.existsSync(file.path)) throw new Error('Arquivo temporário não encontrado');
    console.log(`✅ Arquivo validado: ${file.originalname} (${file.size} bytes)`);
  }

  static resolveImageUrl(filenameOrUrl: string): string {
    if (filenameOrUrl.startsWith('http')) return filenameOrUrl;
    const baseURL = process.env.API_URL || 'http://localhost:3000';
    return `${baseURL}/uploads/${filenameOrUrl}`;
  }
}
