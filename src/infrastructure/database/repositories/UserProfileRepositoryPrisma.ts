import { User } from '@/core/entities/User';
import { UserProfile } from '../../../core/entities/UserProfile';
import { PrismaClient, user_profile } from '@prisma/client';

const prisma = new PrismaClient();

export class UserProfileRepositoryPrisma {
  async findByUserId(userId: number): Promise<UserProfile | null> {
  const profile = await prisma.user_profile.findUnique({ where: { user_id: userId } });
  if (!profile) return null;

  return new UserProfile(
    profile.user_id,
    profile.profile_type,
    profile.profile_photo,
    profile.bio,
    profile.city,
    profile.state,
    profile.created_at,
    profile.updated_at,
    profile.id
  );
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
