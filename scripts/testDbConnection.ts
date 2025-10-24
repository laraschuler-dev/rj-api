import 'dotenv/config'; // Já carrega o .env.test

async function testConnection() {
  try {
    // AGORA essas variáveis estão disponíveis
    console.log(`📊 Banco: rj_dev`);
    console.log(`📍 Servidor: localhost:3306`);
    console.log(
      `🔍 DATABASE_URL: ${process.env.DATABASE_URL?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`
    );

    // Só importa o Prisma DEPOIS do dotenv
    const { prisma } = await import(
      '../src/infrastructure/database/prisma/prisma'
    );

    const result = await prisma.$queryRaw`SELECT 1+1 as result`;
    console.log('✅ Conexão estabelecida! Resultado:', result);
  } catch (error) {
    console.error('❌ Erro na conexão:', error);
  }
}

testConnection();
