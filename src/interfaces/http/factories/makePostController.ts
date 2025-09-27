// interfaces/http/factories/makePostController.ts
import { PostRepositoryPrisma } from '../../../infrastructure/database/repositories/PostRepositoryPrisma';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { PostService } from '../../../application/services/PostService';
import { PostUseCases } from '../../../application/use-cases/PostUseCases';
import { PostController } from '../controllers/PostController';
import { UserProfileRepositoryPrisma } from '../../../infrastructure/database/repositories/UserProfileRepositoryPrisma';

/**
 * Factory responsável por instanciar e injetar as dependências do PostController.
 * Garante que o controlador seja criado com todos os serviços e repositórios necessários.
 * @returns Instância de PostController pronta para uso nas rotas.
 */



export function makePostController(): PostController {
  const postRepository = new PostRepositoryPrisma();
  const userRepository = new UserRepositoryPrisma();
  const userProfileRepository = new UserProfileRepositoryPrisma();

  const postService = new PostService(postRepository, userRepository);
  const postUseCases = new PostUseCases(postService);

  return new PostController(postUseCases, userRepository, userProfileRepository);
}
