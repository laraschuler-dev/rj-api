// interfaces/factories/makeSpecializedPostController.ts
import { PostRepositoryPrisma } from '../../../infrastructure/database/repositories/PostRepositoryPrisma';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { SpecializedPostService } from '../../../application/services/SpecializedPostService';
import { SpecializedPostUseCases } from '../../../application/use-cases/SpecializedPostUseCases';
import { SpecializedPostController } from '../controllers/SpecializedPostController';

export function makeSpecializedPostController(): SpecializedPostController {
  const postRepository = new PostRepositoryPrisma();
  const userRepository = new UserRepositoryPrisma();

  const specializedPostService = new SpecializedPostService(postRepository, userRepository);
  const specializedPostUseCases = new SpecializedPostUseCases(specializedPostService);

  return new SpecializedPostController(specializedPostUseCases);
}