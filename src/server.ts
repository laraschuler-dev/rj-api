import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env correto baseado no NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`🌍 Ambiente carregado: ${process.env.NODE_ENV}`);

// Import DEPOIS do dotenv para garantir que as variáveis estão carregadas
import { app } from './app';

const PORT = process.env.PORT || 3000;
console.log(`🚀 Iniciando servidor na porta ${PORT}...`);

const server = app.listen(PORT, () => {
  console.log(`📡 URL: http://localhost:${PORT}`);
})
.on('error', (error) => {
  console.log('❌ ERRO AO INICIAR SERVIDOR:', error);
});

// Adiciona tratamento para manter o servidor ativo
process.on('SIGINT', () => {
  console.log('🛑 Servidor finalizado');
  server.close();
  process.exit(0);
});