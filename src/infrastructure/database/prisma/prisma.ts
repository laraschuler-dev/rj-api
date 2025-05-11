import { PrismaClient } from '@prisma/client';

/**
 * Configuração do Prisma Client.
 * Garante que apenas uma instância do Prisma seja criada no ambiente de desenvolvimento,
 * evitando problemas com hot reload.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Instância do Prisma Client.
 * Reutiliza a instância existente no ambiente de desenvolvimento ou cria uma nova.
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}