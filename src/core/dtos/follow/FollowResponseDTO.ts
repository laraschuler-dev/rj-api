// src/core/dtos/follow/FollowResponseDTO.ts
export interface FollowResponseDTO {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: Date;
  followingUser?: {
    id: number;
    name: string;
    profilePhoto?: string | null;
  };
  followerUser?: {
    id: number;
    name: string;
    profilePhoto?: string | null;
  };
}