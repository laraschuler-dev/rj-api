import { UpdateUserProfileDTO } from "../../../core/dtos/userProfile/UpdateUserProfileDTO";
import { UserProfileRepository } from "../../../core/repositories/UserProfileRepository";
import { UserRepository } from "../../../core/repositories/UserRepository";

export class UpdateUserProfileUseCase {
  constructor(
    private userProfileRepository: UserProfileRepository,
    private userRepository: UserRepository // INJETAR UserRepository
  ) {}

  async execute(userId: number, data: UpdateUserProfileDTO) {
    // VERIFICAÇÃO ÚNICA: usuário excluído
    const isUserDeleted = await this.userRepository.isUserDeleted(userId);
    if (isUserDeleted) {
      throw new Error('Não é possível atualizar perfil de usuário excluído');
    }

    return this.userProfileRepository.update(userId, data);
  }
}