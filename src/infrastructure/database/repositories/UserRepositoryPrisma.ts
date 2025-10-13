import { PrismaClient } from '@prisma/client';
import { User } from '../../../core/entities/User';
import { UserRepository } from '../../../core/repositories/UserRepository';

const prisma = new PrismaClient();

/**
 * Implementação do repositório de usuários utilizando o Prisma.
 * Este repositório realiza operações no banco de dados relacionadas à entidade User.
 */
export class UserRepositoryPrisma implements UserRepository {
  /**
   * Cria um novo usuário no banco de dados.
   * @param user - Dados do usuário a ser criado.
   * @returns O usuário criado.
   */
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        e_mail: user.email, // Campo no banco de dados
        passwordHash: user.password, // Campo no banco de dados
        fone: user.phone, // Campo no banco de dados
      },
    });

    return new User(
      createdUser.iduser, // Campo no banco de dados
      createdUser.name,
      createdUser.e_mail,
      createdUser.passwordHash,
      createdUser.fone
    );
  }

  /**
   * Busca um usuário pelo e-mail ou telefone.
   * @param emailOrPhone - E-mail ou telefone do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  async findByEmailOrPhone(emailOrPhone: string): Promise<User | null> {
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [
          { e_mail: emailOrPhone }, // Campo no banco de dados
          { fone: emailOrPhone }, // Campo no banco de dados
        ],
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
      foundUser.fone
    );
  }

  /**
   * Busca um usuário pelo ID.
   * @param id - ID do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  async findByIdUser(id: number): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({
      where: { iduser: id }, // Campo no banco de dados
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser,
      foundUser.name,
      foundUser.e_mail,
      foundUser.passwordHash,
      foundUser.fone
    );
  }

  /**
   * Busca um usuário pelo e-mail.
   * @param email - E-mail do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  async findByEmail(email: string): Promise<User | null> {
    const foundUser = await prisma.user.findUnique({
      where: { e_mail: email }, // Campo no banco de dados
    });

    if (!foundUser) {
      return null;
    }

    return new User(
      foundUser.iduser,
      foundUser.name,
      foundUser.e_mail,
      foundUser.passwordHash,
      foundUser.fone
    );
  }

  /**
   * Salva o token de recuperação de senha para um usuário.
   * @param userId - ID do usuário.
   * @param token - Token de recuperação de senha.
   * @param expiresAt - Data de expiração do token.
   * @returns Uma promessa resolvida quando o token for salvo.
   */
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

  /**
   * Busca um usuário pelo token de recuperação de senha.
   * @param token - Token de recuperação de senha.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  async findByPasswordResetToken(token: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!user) return null;

    return {
      ...new User(
        user.iduser,
        user.name,
        user.e_mail,
        user.passwordHash,
        user.fone
      ),
      passwordResetTokenExpiresAt: user.passwordResetTokenExpiresAt, // Campo adicional
    };
  }

  /**
   * Atualiza a senha de um usuário e remove o token de recuperação.
   * @param userId - ID do usuário.
   * @param newPasswordHash - Nova senha criptografada.
   * @returns Uma promessa resolvida quando a operação for concluída.
   */
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
    data: { name?: string; email?: string; phone?: string }
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
      updatedUser.fone
    );
  }

  async updatePassword(userId: number, newPasswordHash: string): Promise<void> {
    await prisma.user.update({
      where: { iduser: userId },
      data: { passwordHash: newPasswordHash },
    });
  }

  // Versão com busca mais inteligente
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
        },
        include: {
          user_profile: {
            select: {
              profile_type: true,
              profile_photo: true,
            },
          },
        },
        orderBy: [
          // 👈 ORDENAÇÃO INTELIGENTE: prioriza startsWith
          { name: 'asc' }, // Você pode ordenar por relevância se quiser
        ],
        skip: offset,
        take: limit,
      }),

      prisma.user.count({
        where: {
          OR: [
            { name: { startsWith: searchTerm } },
            { name: { contains: searchTerm } },
          ],
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
