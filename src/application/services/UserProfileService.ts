// src/application/services/UserProfileService.ts
import { UserProfileRepository } from '../../core/repositories/UserProfileRepository';
import { UserRepository } from '../../core/repositories/UserRepository';
import { UpdateUserProfileDTO } from '../../core/dtos/userProfile/UpdateUserProfileDTO';
import { PublicUserProfileDTO } from '../../core/dtos/userProfile/PublicUserProfileDTO';
import { GetPublicUserProfileUseCase } from '../use-cases/userProfile/GetUserProfileUseCase';

export class UserProfileService {
  private getPublicUserProfileUseCase: GetPublicUserProfileUseCase;

  constructor(
    private userProfileRepository: UserProfileRepository,
    private userRepository: UserRepository
  ) {
    this.getPublicUserProfileUseCase = new GetPublicUserProfileUseCase(
      userProfileRepository,
      userRepository
    );
  }

  private translateProfileType(type: string | undefined): string {
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

  async getProfile(userId: number): Promise<any | null> {
    const user = await this.userRepository.findByIdUser(userId);
    if (!user) return null;

    const userProfile = await this.userProfileRepository.findByUserId(userId);

    return {
      id: user.iduser,
      name: user.name,
      email: user.email,
      fone: user.phone,
      profile: {
        ...userProfile,
        translated_type: this.translateProfileType(userProfile?.profile_type),
      },
    };
  }

  async getPublicProfile(userId: number): Promise<PublicUserProfileDTO | null> {
    return this.getPublicUserProfileUseCase.execute(userId);
  }

  async updateProfile(userId: number, dto: UpdateUserProfileDTO): Promise<any> {
    let userProfile = await this.userProfileRepository.findByUserId(userId);
    if (userProfile) {
      userProfile = await this.userProfileRepository.update(userId, dto);
    } else {
      userProfile = await this.userProfileRepository.create({
        user_id: userId,
        ...dto,
      });
    }
    return userProfile;
  }
}
