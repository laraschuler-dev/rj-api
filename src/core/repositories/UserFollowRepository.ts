// src/core/repositories/UserFollowRepository.ts
import { UserFollow } from '../entities/UserFollow';
import { UserFollowerInfoDTO } from '../dtos/follow/UserFollowerInfoDTO';
import { FollowStatsDTO } from '../dtos/follow/FollowStatsDTO';

export interface UserFollowRepository {
  create(followerId: number, followingId: number): Promise<UserFollow>;
  delete(followerId: number, followingId: number): Promise<void>;
  exists(followerId: number, followingId: number): Promise<boolean>;
  
  // Buscar seguidores e seguindo
  getFollowers(userId: number, currentUserId?: number): Promise<UserFollowerInfoDTO[]>;
  getFollowing(userId: number, currentUserId?: number): Promise<UserFollowerInfoDTO[]>;
  
  // Estatísticas
  getFollowStats(userId: number, currentUserId?: number): Promise<FollowStatsDTO>;
  
  // Verificar relação
  isFollowing(followerId: number, followingId: number): Promise<boolean>;
}