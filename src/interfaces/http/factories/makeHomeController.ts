// interfaces/factories/makeHomeController.ts
import { PostRepositoryPrisma } from '../../../infrastructure/database/repositories/PostRepositoryPrisma';
import { HomeService } from '../../../application/services/HomeService';
import { HomeController } from '../controllers/HomeController';

export function makeHomeController(): HomeController {
  const postRepository = new PostRepositoryPrisma();
  const homeService = new HomeService(postRepository);

  return new HomeController(homeService);
}