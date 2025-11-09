import { PrismaClient } from '@prisma/client';
import { User } from '../../../core/entities/User';
import { UserRepository } from '../../../core/repositories/UserRepository';

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        e_mail: user.email,
        passwordHash: user.password,
        fone: user.phone || null,
        emailVerified: user.emailVerified || false,
      },
    });

    return new User(
      createdUser.iduser,
      createdUser.name,
      createdUser.e_mail,
      createdUser.passwordHash,
      createdUser.fone,
      createdUser.emailVerified || false,
      createdUser.passwordResetToken || undefined,
      createdUser.passwordResetTokenExpiresAt,
      createdUser.emailVerificationToken || undefined,
      createdUser.emailVerificationTokenExpiresAt
    );
  }

  async saveEmailVerificationToken(
    userId: number,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await prisma.user.update({
      where: { iduser: userId },
      data: {
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: expiresAt,
        emailVerified: false,
      },
    });
  }

  async findByEmailVerificationToken(token: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          gte: new Date(),
        },
        deleted: false,
      },
    });

    if (!user) return null;

    return new User(
      user.iduser,
      user.name,
      user.e_mail,
      user.passwordHash,
      user.fone,
      user.emailVerified || false,
      user.passwordResetToken || undefined,
      user.passwordResetTokenExpiresAt,
      user.emailVerificationToken || undefined,
      user.emailVerificationTokenExpiresAt
    );
  }

  async markEmailAsVerified(userId: number): Promise<void> {
    await prisma.user.update({
      where: { iduser: userId },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
      },
    });
  }

  async softDeleteUser(userId: number, reason?: string): Promise<void> {
    await prisma.user.update({
      where: { iduser: userId },
      data: {
        deleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async isUserDeleted(userId: number): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { iduser: userId },
      select: { deleted: true },
    });

    return user?.deleted || false;
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [{ e_mail: emailOrPhone }, { fone: emailOrPhone }],
        deleted: false,
      },
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser,
      foundUser.name,
      foundUser.e_mail,
      foundUser.passwordHash,
      foundUser.fone,
      foundUser.emailVerified || false, // ✅ VÍRGULA ADICIONADA
      foundUser.passwordResetToken || undefined,
      foundUser.passwordResetTokenExpiresAt,
      foundUser.emailVerificationToken || undefined,
      foundUser.emailVerificationTokenExpiresAt
    );
  }

  async findByIdUser(id: number): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        iduser: id,
        deleted: false,
      },
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser,
      foundUser.name,
      foundUser.e_mail,
      foundUser.passwordHash,
      foundUser.fone,
      foundUser.emailVerified || false, // ✅ VÍRGULA ADICIONADA
      foundUser.passwordResetToken || undefined,
      foundUser.passwordResetTokenExpiresAt,
      foundUser.emailVerificationToken || undefined,
      foundUser.emailVerificationTokenExpiresAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        e_mail: email,
        deleted: false,
      },
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser,
      foundUser.name,
      foundUser.e_mail,
      foundUser.passwordHash,
      foundUser.fone,
      foundUser.emailVerified || false, // ✅ VÍRGULA ADICIONADA
      foundUser.passwordResetToken || undefined,
      foundUser.passwordResetTokenExpiresAt,
      foundUser.emailVerificationToken || undefined,
      foundUser.emailVerificationTokenExpiresAt
    );
  }

  async savePasswordResetToken(
    userId: number,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await prisma.user.update({
      where: { iduser: userId },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: expiresAt,
      },
    });
  }

  async findByPasswordResetToken(token: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: {
          gte: new Date(),
        },
        deleted: false,
      },
    });

    if (!user) return null;

    return new User(
      user.iduser,
      user.name,
      user.e_mail,
      user.passwordHash,
      user.fone,
      user.emailVerified || false, // ✅ ADICIONADO
      user.passwordResetToken || undefined,
      user.passwordResetTokenExpiresAt,
      user.emailVerificationToken || undefined,
      user.emailVerificationTokenExpiresAt
    );
  }

  async updatePasswordAndClearResetToken(
    userId: number,
    newPasswordHash: string
  ): Promise<void> {
    await prisma.user.update({
      where: { iduser: userId },
      data: {
        passwordHash: newPasswordHash,
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
      },
    });
  }

  async updateUserData(
    userId: number,
    data: { name?: string; email?: string; phone?: string | null }
  ): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { iduser: userId },
      data: {
        name: data.name,
        e_mail: data.email,
        fone: data.phone,
      },
    });

    return new User(
      updatedUser.iduser,
      updatedUser.name,
      updatedUser.e_mail,
      updatedUser.passwordHash,
      updatedUser.fone,
      updatedUser.emailVerified || false, // ✅ ADICIONADO
      updatedUser.passwordResetToken || undefined,
      updatedUser.passwordResetTokenExpiresAt,
      updatedUser.emailVerificationToken || undefined,
      updatedUser.emailVerificationTokenExpiresAt
    );
  }

  async updatePassword(userId: number, newPasswordHash: string): Promise<void> {
    await prisma.user.update({
      where: { iduser: userId },
      data: { passwordHash: newPasswordHash },
    });
  }

  async searchUsers(
    searchTerm: string,
    page: number,
    limit: number
  ): Promise<{
    users: Array<{
      id: number;
      name: string;
      email: string;
      avatarUrl?: string;
      profileType?: string;
    }>;
    totalCount: number;
  }> {
    const offset = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [
            { name: { startsWith: searchTerm } },
            { name: { contains: searchTerm } },
          ],
          deleted: false,
        },
        include: {
          user_profile: {
            select: {
              profile_type: true,
              profile_photo: true,
            },
          },
        },
        orderBy: [{ name: 'asc' }],
        skip: offset,
        take: limit,
      }),

      prisma.user.count({
        where: {
          OR: [
            { name: { startsWith: searchTerm } },
            { name: { contains: searchTerm } },
          ],
          deleted: false,
        },
      }),
    ]);

    return {
      users: users.map((user) => ({
        id: user.iduser,
        name: user.name,
        email: user.e_mail,
        avatarUrl: user.user_profile?.profile_photo || undefined,
        profileType: user.user_profile?.profile_type || undefined,
      })),
      totalCount,
    };
  }
}
