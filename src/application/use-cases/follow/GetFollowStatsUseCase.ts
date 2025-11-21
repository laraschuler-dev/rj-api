// src/core/useCases/follow/GetFollowStatsUseCase.ts
import { UserFollowRepository } from '../../../core/repositories/UserFollowRepository';
import { UserRepository } from '../../../core/repositories/UserRepository';
import { FollowStatsDTO } from '../../../core/dtos/follow/FollowStatsDTO';

export class GetFollowStatsUseCase {
  constructor(
    private userFollowRepository: UserFollowRepository,
    private userRepository: UserRepository
  ) {}

  async execute(userId: number, currentUserId?: number): Promise<FollowStatsDTO> {
    const isUserDeleted = await this.userRepository.isUserDeleted(userId);
    if (isUserDeleted) {
      throw new Error('Usuário não encontrado');
    }

    return this.userFollowRepository.getFollowStats(userId, currentUserId);
  }
}
