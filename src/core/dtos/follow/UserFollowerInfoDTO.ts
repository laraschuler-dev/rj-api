export interface UserFollowerInfoDTO {
  id: number;
  name: string;
  profilePhoto?: string | null;
  profileType?: string;
  bio?: string | null;
  isFollowing?: boolean; // Para verificar se o usuário atual está seguindo este usuário
}
