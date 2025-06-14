// interfaces/http/factories/makeAuthController.ts
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { PasswordRecoveryService } from '../../../application/services/PasswordRecoveryService';
import { AuthService } from '../../../application/services/AuthService';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';
import { AuthController } from '../controllers/AuthController';

/**
 * Factory responsável por instanciar e injetar as dependências do AuthController.
 * Garante que o controlador seja criado com todos os serviços e repositórios necessários para autenticação.
 * @returns Instância de AuthController pronta para uso nas rotas.
 */

export function makeAuthController(): AuthController {
  const userRepository = new UserRepositoryPrisma();
  const passwordRecoveryService = new PasswordRecoveryService(userRepository);
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

  const authService = new AuthService(
    userRepository,
    passwordRecoveryService,
    jwtSecret
  );

  const authUseCases = new AuthUseCases(authService);
  return new AuthController(authUseCases);
}
