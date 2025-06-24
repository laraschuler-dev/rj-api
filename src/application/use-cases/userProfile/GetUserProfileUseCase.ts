import { UserProfileRepository } from '../../../core/repositories/UserProfileRepository';

export class GetUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute(userId: number) {
    return this.userProfileRepository.findByUserId(userId);
  }
}
