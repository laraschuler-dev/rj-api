import { UserProfileRepository } from '../../../core/repositories/UserProfileRepository';
import { UpdateUserProfileDTO } from '../../../core/dtos/userProfile/UpdateUserProfileDTO';

export class UpdateUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute(userId: number, data: UpdateUserProfileDTO) {
    return this.userProfileRepository.update(userId, data);
  }
}
