import 'dotenv/config' // Adicione esta linha no topo
import prisma from './prisma'

async function testConnection() {
  try {
    console.log('Tentando conectar com DATABASE_URL:', process.env.DATABASE_URL)
    
    // Testa uma consulta simples (ajuste para um modelo que você tem)
    const result = await prisma.$queryRaw`SELECT 1+1 as result`
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!')
    console.log('Resultado do teste:', result)
  } catch (error) {
    console.error('❌ Falha ao conectar ao banco de dados:')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()