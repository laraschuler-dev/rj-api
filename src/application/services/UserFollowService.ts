// src/application/services/UserFollowService.ts

import { CreateFollowDTO } from '../../core/dtos/follow/CreateFollowDTO';
import { FollowResponseDTO } from '../../core/dtos/follow/FollowResponseDTO';
import { UserFollowerInfoDTO } from '../../core/dtos/follow/UserFollowerInfoDTO';
import { FollowStatsDTO } from '../../core/dtos/follow/FollowStatsDTO';
import { CreateFollowUseCase } from '../use-cases/follow/CreateFollowUseCase';
import { DeleteFollowUseCase } from '../use-cases/follow/DeleteFollowUseCase';
import { CheckIsFollowingUseCase } from '../use-cases/follow/CheckIsFollowingUseCase';
import { GetFollowStatsUseCase } from '../use-cases/follow/GetFollowStatsUseCase';
import { GetFollowingUseCase } from '../use-cases/follow/GetFollowingUseCase';
import { GetFollowersUseCase } from '../use-cases/follow/GetFollowersUseCase';

export class UserFollowService {
  private createFollowUseCase: CreateFollowUseCase;
  private deleteFollowUseCase: DeleteFollowUseCase;
  private getFollowersUseCase: GetFollowersUseCase;
  private getFollowingUseCase: GetFollowingUseCase;
  private getFollowStatsUseCase: GetFollowStatsUseCase;
  private checkIsFollowingUseCase: CheckIsFollowingUseCase;

  constructor(
    createFollowUseCase: CreateFollowUseCase,
    deleteFollowUseCase: DeleteFollowUseCase,
    getFollowersUseCase: GetFollowersUseCase,
    getFollowingUseCase: GetFollowingUseCase,
    getFollowStatsUseCase: GetFollowStatsUseCase,
    checkIsFollowingUseCase: CheckIsFollowingUseCase
  ) {
    this.createFollowUseCase = createFollowUseCase;
    this.deleteFollowUseCase = deleteFollowUseCase;
    this.getFollowersUseCase = getFollowersUseCase;
    this.getFollowingUseCase = getFollowingUseCase;
    this.getFollowStatsUseCase = getFollowStatsUseCase;
    this.checkIsFollowingUseCase = checkIsFollowingUseCase;
  }

  async followUser(followerId: number, data: CreateFollowDTO): Promise<FollowResponseDTO> {
    return this.createFollowUseCase.execute(followerId, data);
  }

  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    return this.deleteFollowUseCase.execute(followerId, followingId);
  }

  async getFollowers(userId: number, currentUserId?: number): Promise<UserFollowerInfoDTO[]> {
    return this.getFollowersUseCase.execute(userId, currentUserId);
  }

  async getFollowing(userId: number, currentUserId?: number): Promise<UserFollowerInfoDTO[]> {
    return this.getFollowingUseCase.execute(userId, currentUserId);
  }

  async getFollowStats(userId: number, currentUserId?: number): Promise<FollowStatsDTO> {
    return this.getFollowStatsUseCase.execute(userId, currentUserId);
  }

  async checkIsFollowing(followerId: number, followingId: number): Promise<boolean> {
    return this.checkIsFollowingUseCase.execute(followerId, followingId);
  }
}