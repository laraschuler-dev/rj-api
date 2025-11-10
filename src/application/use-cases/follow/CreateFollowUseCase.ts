import { FollowResponseDTO } from '../../../core/dtos/follow/CreateFollowDTO';
import { CreateFollowDTO } from '../../../core/dtos/follow/CreateFollowDTO';
import { UserFollowRepository } from '../../../core/repositories/UserFollowRepository';
import { UserRepository } from '../../../core/repositories/UserRepository';

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
}
