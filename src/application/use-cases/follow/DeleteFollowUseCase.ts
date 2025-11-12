// src/core/useCases/follow/DeleteFollowUseCase.ts
import { UserFollowRepository } from '../../../core/repositories/UserFollowRepository';

export class DeleteFollowUseCase {
  constructor(private userFollowRepository: UserFollowRepository) {}

  async execute(followerId: number, followingId: number): Promise<void> {
    // Verificar se está seguindo antes de deixar de seguir
    const isFollowing = await this.userFollowRepository.exists(followerId, followingId);
    if (!isFollowing) {
      throw new Error('Você não está seguindo este usuário');
    }

    await this.userFollowRepository.delete(followerId, followingId);
  }
}
