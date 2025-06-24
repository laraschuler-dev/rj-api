import { UserProfileRepositoryPrisma } from '../../../infrastructure/database/repositories/UserProfileRepositoryPrisma';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { UserProfileService } from '../../../application/services/UserProfileService';
import { UserProfileController } from '../controllers/UserProfileController';

export function makeUserProfileController(): UserProfileController {
  const userProfileRepository = new UserProfileRepositoryPrisma();
  const userRepository = new UserRepositoryPrisma();
  const userProfileService = new UserProfileService(userProfileRepository, userRepository); // <-- passe os dois argumentos
  return new UserProfileController(userProfileService);
}