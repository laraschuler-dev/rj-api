// src/infrastructure/database/prisma/prisma.ts

import { PrismaClient } from '@prisma/client';

// Evita múltiplas instâncias no ambiente de desenvolvimento (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
