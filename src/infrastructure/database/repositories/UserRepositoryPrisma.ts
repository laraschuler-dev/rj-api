import { PrismaClient } from '@prisma/client';
import { User } from '../../../core/entities/User';
import { UserRepository } from '../../../core/repositories/UserRepository';

const prisma = new PrismaClient();

export class UserRepositoryPrisma implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        e_mail: user.email, // Corrigido para e_mail
        passwordHash: user.password, // Corrigido para passwordHash
        fone: user.phone, // Corrigido para fone
      },
    });

    return new User(
      createdUser.iduser, // Corrigido para iduser
      createdUser.name,
      createdUser.e_mail, // Corrigido para e_mail
      createdUser.passwordHash, // Corrigido para passwordHash
      createdUser.fone, // Corrigido para fone
    );
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [
          { e_mail: emailOrPhone }, // Corrigido para e_mail
          { fone: emailOrPhone }, // Corrigido para fone
        ],
      },
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser, // Corrigido para iduser
      foundUser.name,
      foundUser.e_mail, // Corrigido para e_mail
      foundUser.passwordHash, // Corrigido para passwordHash
      foundUser.fone, // Corrigido para fone
    );
  }

  async findById(id: number): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({
      where: { iduser: id }, // Corrigido para iduser
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser, // Corrigido para iduser
      foundUser.name,
      foundUser.e_mail, // Corrigido para e_mail
      foundUser.passwordHash, // Corrigido para passwordHash
      foundUser.fone, // Corrigido para fone
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({
      where: { e_mail: email }, // Corrigido para e_mail
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser, // Corrigido para iduser
      foundUser.name,
      foundUser.e_mail, // Corrigido para e_mail
      foundUser.passwordHash, // Corrigido para passwordHash
      foundUser.fone, // Corrigido para fone
    );
  }
}