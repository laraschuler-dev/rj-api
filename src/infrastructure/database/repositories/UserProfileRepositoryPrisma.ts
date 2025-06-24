import { User } from '@/core/entities/User';
import { PrismaClient, user_profile } from '@prisma/client';

const prisma = new PrismaClient();

export class UserProfileRepositoryPrisma {
  async findByUserId(userId: number): Promise<user_profile | null> {
    return prisma.user_profile.findUnique({ where: { user_id: userId } });
  }

  async create(
    data: Omit<user_profile, 'id' | 'created_at' | 'updated_at'>
  ): Promise<user_profile> {
    return prisma.user_profile.create({ data });
  }

  async update(
    userId: number,
    data: Partial<user_profile>
  ): Promise<user_profile> {
    return prisma.user_profile.update({
      where: { user_id: userId },
      data,
    });
  }
}
