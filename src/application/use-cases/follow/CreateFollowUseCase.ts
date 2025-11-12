import { NotificationRepositoryPrisma } from '../../../infrastructure/database/repositories/NotificationRepositoryPrisma';
import { FollowResponseDTO } from '../../../core/dtos/follow/CreateFollowDTO';
import { CreateFollowDTO } from '../../../core/dtos/follow/CreateFollowDTO';
import { UserFollowRepository } from '../../../core/repositories/UserFollowRepository';
import { UserRepository } from '../../../core/repositories/UserRepository';
import { NotificationService } from '../../../application/services/NotificationService';

// src/core/useCases/follow/CreateFollowUseCase.ts
export class CreateFollowUseCase {
  constructor(
    private userFollowRepository: UserFollowRepository,
    private userRepository: UserRepository
  ) {}

  async execute(
    followerId: number,
    data: CreateFollowDTO
  ): Promise<FollowResponseDTO> {
    // Verificar se o usuário a ser seguido existe
    const userToFollow = await this.userRepository.findByIdUser(
      data.followingId
    );
    if (!userToFollow) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se já está seguindo
    const alreadyFollowing = await this.userFollowRepository.exists(
      followerId,
      data.followingId
    );
    if (alreadyFollowing) {
      throw new Error('Você já está seguindo este usuário');
    }

    // Verificar se não está tentando seguir a si mesmo
    if (followerId === data.followingId) {
      throw new Error('Não é possível seguir a si mesmo');
    }

    // Verificar se a conta do usuário a ser seguido está excluída
    const isUserDeleted = await this.userRepository.isUserDeleted(
      data.followingId
    );
    if (isUserDeleted) {
      throw new Error('Não é possível seguir um usuário com conta excluída');
    }

    const follow = await this.userFollowRepository.create(
      followerId,
      data.followingId
    );

    // Buscar informações do usuário seguido para a resposta
    const followingUser = await this.userRepository.findByIdUser(
      data.followingId
    );

    await this.createFollowNotification(followerId, data.followingId);

    return {
      id: follow.id,
      followerId: follow.followerId,
      followingId: follow.followingId,
      createdAt: follow.createdAt,
      followingUser: followingUser
        ? {
            id: followingUser.id,
            name: followingUser.name,
            profilePhoto: followingUser.avatarUrl,
          }
        : undefined,
    };
  }

  private async createFollowNotification(
    followerId: number,
    followingId: number
  ): Promise<void> {
    try {
      console.log(
        `🎯 Criando notificação de FOLLOW: ${followerId} -> ${followingId}`
      );

      const notificationRepository = new NotificationRepositoryPrisma();
      const notificationService = new NotificationService(
        notificationRepository
      );

      // ✅ AGORA PODE SER null - não precisa de post para follow
      await notificationService.createNotification({
        user_id: followingId,
        actor_id: followerId,
        type: 'FOLLOW',
        post_id: null, // ✅ CORRETO - follow não tem post
        post_share_id: null,
        comment_id: null,
      });

      console.log('✅ Notificação de FOLLOW criada com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao criar notificação de FOLLOW:', error);
    }
  }
}
