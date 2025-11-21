// src/infrastructure/factories/makeUserFollowController.ts

import { CheckIsFollowingUseCase } from '../../../application/use-cases/follow/CheckIsFollowingUseCase';
import { CreateFollowUseCase } from '../../../application/use-cases/follow/CreateFollowUseCase';
import { DeleteFollowUseCase } from '../../../application/use-cases/follow/DeleteFollowUseCase';
import { GetFollowersUseCase } from '../../../application/use-cases/follow/GetFollowersUseCase';
import { GetFollowingUseCase } from '../../../application/use-cases/follow/GetFollowingUseCase';
import { GetFollowStatsUseCase } from '../../../application/use-cases/follow/GetFollowStatsUseCase';
import { UserFollowRepositoryPrisma } from '../../../infrastructure/database/repositories/UserFollowRepositoryPrisma';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { UserFollowController } from '../controllers/UserFollowController';
import { UserFollowService } from '../../../application/services/UserFollowService';
import { NotificationService } from '../../../application/services/NotificationService'; // ✅ NOVO IMPORT
import { NotificationRepositoryPrisma } from '../../../infrastructure/database/repositories/NotificationRepositoryPrisma'; // ✅ NOVO IMPORT

export function makeUserFollowController(): UserFollowController {
  const userFollowRepository = new UserFollowRepositoryPrisma();
  const userRepository = new UserRepositoryPrisma();

  // ✅ CRIAR NotificationService
  const notificationRepository = new NotificationRepositoryPrisma();
  const notificationService = new NotificationService(notificationRepository);

  // Criar todos os use cases
  const createFollowUseCase = new CreateFollowUseCase(
    userFollowRepository,
    userRepository,
  );

  const deleteFollowUseCase = new DeleteFollowUseCase(userFollowRepository);
  const getFollowersUseCase = new GetFollowersUseCase(
    userFollowRepository,
    userRepository
  );
  const getFollowingUseCase = new GetFollowingUseCase(
    userFollowRepository,
    userRepository
  );
  const getFollowStatsUseCase = new GetFollowStatsUseCase(
    userFollowRepository,
    userRepository
  );
  const checkIsFollowingUseCase = new CheckIsFollowingUseCase(
    userFollowRepository
  );

  // Criar o service com os use cases
  const userFollowService = new UserFollowService(
    createFollowUseCase,
    deleteFollowUseCase,
    getFollowersUseCase,
    getFollowingUseCase,
    getFollowStatsUseCase,
    checkIsFollowingUseCase,
    notificationService
  );

  return new UserFollowController(userFollowService);
}
