// src/core/dtos/follow/CreateFollowDTO.ts
export interface CreateFollowDTO {
  followingId: number;
}

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

// src/core/dtos/follow/UserFollowerInfoDTO.ts
export interface UserFollowerInfoDTO {
  id: number;
  name: string;
  profilePhoto?: string | null;
  profileType?: string;
  bio?: string | null;
  isFollowing?: boolean; // Para verificar se o usuário atual está seguindo este usuário
}

// src/core/dtos/follow/FollowStatsDTO.ts
export interface FollowStatsDTO {
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean; // Se o usuário atual está seguindo este perfil
}