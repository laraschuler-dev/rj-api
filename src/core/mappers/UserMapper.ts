// src/core/mappers/UserMapper.ts
import { User } from '../../core/entities/User';
import { UserProfile } from '../../core/entities/UserProfile';
import { AuthorDTO } from '../../core/dtos/PostListItemDTO';

export class UserMapper {
  /**
   * Transforma User + UserProfile em AuthorDTO
   */
  static toAuthorDTO(user: User, profile?: UserProfile): AuthorDTO {
    return {
      id: user.id,
      name: user.name,
      avatarUrl: profile?.profile_photo ?? undefined,
    };
  }
}
