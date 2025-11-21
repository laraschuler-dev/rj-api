// src/core/repositories/UserSocialConnectionRepository.ts

import { UserSocialConnection } from '../entities/UserSocialConnection';

export interface UserSocialConnectionRepository {
  /**
   * Cria uma nova conexão social para um usuário
   */
  create(connection: UserSocialConnection): Promise<UserSocialConnection>;

  /**
   * Busca conexão social por userId e provider
   */
  findByUserIdAndProvider(
    userId: number,
    provider: string
  ): Promise<UserSocialConnection | null>;

  /**
   * Busca conexão social por providerId
   */
  findByProviderId(
    provider: string,
    providerId: string
  ): Promise<UserSocialConnection | null>;

  /**
   * Busca todas as conexões sociais de um usuário
   */
  findByUserId(userId: number): Promise<UserSocialConnection[]>;

  /**
   * Remove uma conexão social específica
   */
  delete(userId: number, provider: string): Promise<void>;

  /**
   * Remove todas as conexões sociais de um usuário
   */
  deleteAllUserConnections(userId: number): Promise<void>;
}
