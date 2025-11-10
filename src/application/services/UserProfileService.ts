// src/application/services/UserProfileService.ts
import { UserProfileRepository } from '../../core/repositories/UserProfileRepository';
import { UserRepository } from '../../core/repositories/UserRepository';
import { UpdateUserProfileDTO } from '../../core/dtos/userProfile/UpdateUserProfileDTO';
import { PublicUserProfileDTO } from '../../core/dtos/userProfile/PublicUserProfileDTO';
import { GetPublicUserProfileUseCase } from '../use-cases/userProfile/GetUserProfileUseCase';
import { GetFollowStatsUseCase } from '../use-cases/follow/GetFollowStatsUseCase'; // NOVO

export class UserProfileService {
  private getPublicUserProfileUseCase: GetPublicUserProfileUseCase;
  private getFollowStatsUseCase: GetFollowStatsUseCase; // NOVO

  constructor(
    private userProfileRepository: UserProfileRepository,
    private userRepository: UserRepository,
    getFollowStatsUseCase: GetFollowStatsUseCase // NOVO - injetar via construtor
  ) {
    this.getPublicUserProfileUseCase = new GetPublicUserProfileUseCase(
      userProfileRepository,
      userRepository
    );
    this.getFollowStatsUseCase = getFollowStatsUseCase; // NOVO
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
    const followStats = await this.getFollowStatsUseCase.execute(
      userId,
      userId
    ); // NOVO

    return {
      id: user.iduser,
      name: user.name,
      email: user.email,
      fone: user.phone,
      followStats, // NOVO
      profile: {
        ...userProfile,
        translated_type: this.translateProfileType(userProfile?.profile_type),
      },
    };
  }

  async getPublicProfile(userId: number): Promise<PublicUserProfileDTO | null> {
    const publicProfile =
      await this.getPublicUserProfileUseCase.execute(userId);

    if (!publicProfile) return null;

    // NOVO: Adicionar estatísticas de follow ao perfil público
    const followStats = await this.getFollowStatsUseCase.execute(userId);

    return new PublicUserProfileDTO(publicProfile.id, publicProfile.name, {
      ...publicProfile.profile,
      followStats, // NOVO
    });
  }

  async updateProfile(userId: number, dto: UpdateUserProfileDTO): Promise<any> {
    const userProfile = await this.userProfileRepository.findByUserId(userId);

    if (userProfile) {
      // ✅ Atualização: profile_type é opcional (mantém o existente)
      return await this.userProfileRepository.update(userId, dto);
    } else {
      if (!dto.profile_type) {
        throw new Error(
          'Tipo de perfil é obrigatório para criar um novo perfil'
        );
      }

      // ✅ Cria com os dados validados
      return await this.userProfileRepository.create({
        user_id: userId,
        profile_type: dto.profile_type,
        profile_photo: dto.profile_photo || null,
        bio: dto.bio || null,
        city: dto.city || null,
        state: dto.state || null,
      });
    }
  }
}
