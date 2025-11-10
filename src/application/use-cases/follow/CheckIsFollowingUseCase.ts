// src/core/useCases/follow/CheckIsFollowingUseCase.ts
import { UserFollowRepository } from '../../../core/repositories/UserFollowRepository';

export class CheckIsFollowingUseCase {
  constructor(private userFollowRepository: UserFollowRepository) {}

  async execute(followerId: number, followingId: number): Promise<boolean> {
    return this.userFollowRepository.isFollowing(followerId, followingId);
  }
}
