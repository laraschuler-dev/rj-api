import { prisma } from '../../infrastructure/database/prisma/prisma';

class BaseService<T extends keyof typeof prisma> {
  protected prisma = prisma;

  constructor(private model: T) {}

  async findAll() {
    return this.prisma[this.model].findMany();
  }

  async findById(id: number) {
    return this.prisma[this.model]?.findUnique({
      where: { id },
    });
  }

  // Adicione outros métodos comuns conforme necessário
}

export default BaseService;
