// src/core/useCases/follow/GetFollowingUseCase.ts
import { UserFollowRepository } from '../../../core/repositories/UserFollowRepository';
import { UserRepository } from '../../../core/repositories/UserRepository';
import { UserFollowerInfoDTO } from '../../../core/dtos/follow/UserFollowerInfoDTO';

export class GetFollowingUseCase {
  constructor(
    private userFollowRepository: UserFollowRepository,
    private userRepository: UserRepository
  ) {}

  async execute(
    userId: number,
    currentUserId?: number
  ): Promise<UserFollowerInfoDTO[]> {
    const isUserDeleted = await this.userRepository.isUserDeleted(userId);
    if (isUserDeleted) {
      throw new Error('Usuário não encontrado');
    }

    return this.userFollowRepository.getFollowing(userId, currentUserId);
  }
}
