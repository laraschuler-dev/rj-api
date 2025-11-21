// src/infrastructure/repositories/UserFollowRepositoryPrisma.ts
import { PrismaClient } from '@prisma/client';
import { UserFollowRepository } from '../../../core/repositories/UserFollowRepository';
import { UserFollow } from '../../../core/entities/UserFollow';
import { UserFollowerInfoDTO } from '../../../core/dtos/follow/UserFollowerInfoDTO';
import { FollowStatsDTO } from '../../../core/dtos/follow/FollowStatsDTO';

export class UserFollowRepositoryPrisma implements UserFollowRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(followerId: number, followingId: number): Promise<UserFollow> {
    if (followerId === followingId) {
      throw new Error('Não é possível seguir a si mesmo');
    }

    const follow = await this.prisma.user_follow.create({
      data: {
        follower_id: followerId,
        following_id: followingId,
      },
    });

    return new UserFollow(
      follow.id,
      follow.follower_id,
      follow.following_id,
      follow.created_at
    );
  }

  async delete(followerId: number, followingId: number): Promise<void> {
    await this.prisma.user_follow.deleteMany({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
  }

  async exists(followerId: number, followingId: number): Promise<boolean> {
    const follow = await this.prisma.user_follow.findFirst({
      where: {
        follower_id: followerId,
        following_id: followingId,
      },
    });
    return !!follow;
  }

  async getFollowers(
    userId: number,
    currentUserId?: number
  ): Promise<UserFollowerInfoDTO[]> {
    const followers = await this.prisma.user_follow.findMany({
      where: {
        following_id: userId,
      },
      include: {
        follower: {
          include: {
            user_profile: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return Promise.all(
      followers.map(async (follow) => {
        let isFollowing = false;
        if (currentUserId) {
          isFollowing = await this.exists(currentUserId, follow.follower_id);
        }

        return {
          id: follow.follower.iduser,
          name: follow.follower.name,
          profilePhoto: follow.follower.user_profile?.profile_photo || null,
          profileType: follow.follower.user_profile?.profile_type || undefined,
          bio: follow.follower.user_profile?.bio || null,
          isFollowing,
        };
      })
    );
  }

  async getFollowing(
    userId: number,
    currentUserId?: number
  ): Promise<UserFollowerInfoDTO[]> {
    const following = await this.prisma.user_follow.findMany({
      where: {
        follower_id: userId,
      },
      include: {
        following: {
          include: {
            user_profile: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return Promise.all(
      following.map(async (follow) => {
        let isFollowing = false;
        if (currentUserId) {
          isFollowing = await this.exists(currentUserId, follow.following_id);
        }

        return {
          id: follow.following.iduser,
          name: follow.following.name,
          profilePhoto: follow.following.user_profile?.profile_photo || null,
          profileType: follow.following.user_profile?.profile_type || undefined,
          bio: follow.following.user_profile?.bio || null,
          isFollowing,
        };
      })
    );
  }

  async getFollowStats(
    userId: number,
    currentUserId?: number
  ): Promise<FollowStatsDTO> {
    const [followersCount, followingCount] = await Promise.all([
      this.prisma.user_follow.count({
        where: { following_id: userId },
      }),
      this.prisma.user_follow.count({
        where: { follower_id: userId },
      }),
    ]);

    let isFollowing = false;
    if (currentUserId && currentUserId !== userId) {
      isFollowing = await this.exists(currentUserId, userId);
    }

    return {
      followersCount,
      followingCount,
      isFollowing,
    };
  }

  async isFollowing(followerId: number, followingId: number): Promise<boolean> {
    return this.exists(followerId, followingId);
  }
}
