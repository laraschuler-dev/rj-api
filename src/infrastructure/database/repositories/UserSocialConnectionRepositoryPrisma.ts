// src/infrastructure/database/repositories/UserSocialConnectionRepositoryPrisma.ts

import { PrismaClient } from '@prisma/client';
import { UserSocialConnection } from '../../../core/entities/UserSocialConnection';
import { UserSocialConnectionRepository } from '../../../core/repositories/UserSocialConnectionRepository';

const prisma = new PrismaClient();

export class UserSocialConnectionRepositoryPrisma implements UserSocialConnectionRepository {
  
  async create(connection: UserSocialConnection): Promise<UserSocialConnection> {
    const createdConnection = await prisma.user_social_connection.create({
      data: {
        user_id: connection.userId,
        provider: connection.provider,
        provider_id: connection.providerId,
        provider_email: connection.providerEmail,
      },
    });

    return new UserSocialConnection(
      createdConnection.id,
      createdConnection.user_id,
      createdConnection.provider,
      createdConnection.provider_id,
      createdConnection.provider_email,
      createdConnection.created_at || new Date() // ✅ CORREÇÃO: fallback para new Date()
    );
  }

  async findByUserIdAndProvider(
    userId: number, 
    provider: string
  ): Promise<UserSocialConnection | null> {
    const connection = await prisma.user_social_connection.findUnique({
      where: {
        user_id_provider: {
          user_id: userId,
          provider: provider,
        },
      },
    });

    if (!connection) return null;

    return new UserSocialConnection(
      connection.id,
      connection.user_id,
      connection.provider,
      connection.provider_id,
      connection.provider_email,
      connection.created_at || new Date() // ✅ CORREÇÃO
    );
  }

  async findByProviderId(
    provider: string, 
    providerId: string
  ): Promise<UserSocialConnection | null> {
    const connection = await prisma.user_social_connection.findFirst({
      where: {
        provider: provider,
        provider_id: providerId,
      },
    });

    if (!connection) return null;

    return new UserSocialConnection(
      connection.id,
      connection.user_id,
      connection.provider,
      connection.provider_id,
      connection.provider_email,
      connection.created_at || new Date() // ✅ CORREÇÃO
    );
  }

  async findByUserId(userId: number): Promise<UserSocialConnection[]> {
    const connections = await prisma.user_social_connection.findMany({
      where: {
        user_id: userId,
      },
    });

    return connections.map(conn => new UserSocialConnection(
      conn.id,
      conn.user_id,
      conn.provider,
      conn.provider_id,
      conn.provider_email,
      conn.created_at || new Date() // ✅ CORREÇÃO
    ));
  }

  async delete(userId: number, provider: string): Promise<void> {
    await prisma.user_social_connection.delete({
      where: {
        user_id_provider: {
          user_id: userId,
          provider: provider,
        },
      },
    });
  }

  async deleteAllUserConnections(userId: number): Promise<void> {
    await prisma.user_social_connection.deleteMany({
      where: {
        user_id: userId,
      },
    });
  }
}