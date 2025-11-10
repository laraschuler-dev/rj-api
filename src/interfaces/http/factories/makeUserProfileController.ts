import { UserProfileRepositoryPrisma } from '../../../infrastructure/database/repositories/UserProfileRepositoryPrisma';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { UserProfileService } from '../../../application/services/UserProfileService';
import { UserProfileController } from '../controllers/UserProfileController';
import { UserFollowRepositoryPrisma } from '../../../infrastructure/database/repositories/UserFollowRepositoryPrisma';
import { GetFollowStatsUseCase } from '../../../application/use-cases/follow/GetFollowStatsUseCase';


export function makeUserProfileController(): UserProfileController {
  const userProfileRepository = new UserProfileRepositoryPrisma();
  const userRepository = new UserRepositoryPrisma();
  const userFollowRepository = new UserFollowRepositoryPrisma();
  
  // NOVO: Criar o use case de follow stats
  const getFollowStatsUseCase = new GetFollowStatsUseCase(
    userFollowRepository, 
    userRepository
  );

  const userProfileService = new UserProfileService(
    userProfileRepository,
    userRepository,
    getFollowStatsUseCase
  );

  return new UserProfileController(userProfileService);
}