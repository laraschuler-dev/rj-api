// interfaces/http/factories/makeAuthController.ts
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { PasswordRecoveryService } from '../../../application/services/PasswordRecoveryService';
import { AuthService } from '../../../application/services/AuthService';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';
import { AuthController } from '../controllers/AuthController';
import { UserSocialConnectionRepositoryPrisma } from '../../../infrastructure/database/repositories/UserSocialConnectionRepositoryPrisma';

/**
 * Factory responsável por instanciar e injetar as dependências do AuthController.
 * Garante que o controlador seja criado com todos os serviços e repositórios necessários para autenticação.
 * @returns Instância de AuthController pronta para uso nas rotas.
 */

export function makeAuthController(): AuthController {
  const userRepository = new UserRepositoryPrisma();
  const passwordRecoveryService = new PasswordRecoveryService(userRepository);
  const userSocialConnectionRepository = new UserSocialConnectionRepositoryPrisma();
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

  const authService = new AuthService(
    userRepository,
    passwordRecoveryService,
    userSocialConnectionRepository,
    jwtSecret
  );

  const authUseCases = new AuthUseCases(authService);
  return new AuthController(authUseCases);
}
