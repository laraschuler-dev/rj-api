// src/core/useCases/userProfile/GetPublicUserProfileUseCase.ts

import { PublicUserProfileDTO } from '../../../core/dtos/userProfile/PublicUserProfileDTO';
import { UserProfileRepository } from '../../../core/repositories/UserProfileRepository';
import { UserRepository } from '../../../core/repositories/UserRepository';

export class GetPublicUserProfileUseCase {
  constructor(
    private userProfileRepository: UserProfileRepository,
    private userRepository: UserRepository
  ) {}

  private translateProfileType(type: string | undefined | null): string {
    if (!type) return 'Não informado';

    const map: Record<string, string> = {
      psr: 'Pessoa em situação de rua',
      volunteer: 'Voluntário(a)',
      ong: 'ONG',
      company: 'Empresa',
      public_institution: 'Instituição Pública',
    };

    return map[type] || 'Tipo não reconhecido';
  }

  async execute(userId: number): Promise<PublicUserProfileDTO | null> {
    const user = await this.userRepository.findByIdUser(userId);
    if (!user) return null;

    // VERIFICAÇÃO ÚNICA: usuário excluído
    const isUserDeleted = await this.userRepository.isUserDeleted(userId);
    if (isUserDeleted) {
      return null;
    }

    const userProfile = await this.userProfileRepository.findByUserId(userId);

    return new PublicUserProfileDTO(user.iduser, user.name, {
      profile_type: userProfile?.profile_type || null,
      translated_type: this.translateProfileType(userProfile?.profile_type),
      profile_photo: userProfile?.profile_photo || null,
      bio: userProfile?.bio || null,
      city: userProfile?.city || null,
      state: userProfile?.state || null,
    });
  }
}
