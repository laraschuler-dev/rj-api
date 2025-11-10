// src/infrastructure/factories/makeUserFollowController.ts

import { CheckIsFollowingUseCase } from "../../../application/use-cases/follow/CheckIsFollowingUseCase";
import { CreateFollowUseCase } from "../../../application/use-cases/follow/CreateFollowUseCase";
import { DeleteFollowUseCase } from "../../../application/use-cases/follow/DeleteFollowUseCase";
import { GetFollowersUseCase } from "../../../application/use-cases/follow/GetFollowersUseCase";
import { GetFollowingUseCase } from "../../../application/use-cases/follow/GetFollowingUseCase";
import { GetFollowStatsUseCase } from "../../../application/use-cases/follow/GetFollowStatsUseCase";
import { UserFollowRepositoryPrisma } from "../../../infrastructure/database/repositories/UserFollowRepositoryPrisma";
import { UserRepositoryPrisma } from "../../../infrastructure/database/repositories/UserRepositoryPrisma";
import { UserFollowController } from "../controllers/UserFollowController";
import { UserFollowService } from "../../../application/services/UserFollowService";


export function makeUserFollowController(): UserFollowController {
  const userFollowRepository = new UserFollowRepositoryPrisma();
  const userRepository = new UserRepositoryPrisma();

  // Criar todos os use cases
  const createFollowUseCase = new CreateFollowUseCase(userFollowRepository, userRepository);
  const deleteFollowUseCase = new DeleteFollowUseCase(userFollowRepository);
  const getFollowersUseCase = new GetFollowersUseCase(userFollowRepository, userRepository);
  const getFollowingUseCase = new GetFollowingUseCase(userFollowRepository, userRepository);
  const getFollowStatsUseCase = new GetFollowStatsUseCase(userFollowRepository, userRepository);
  const checkIsFollowingUseCase = new CheckIsFollowingUseCase(userFollowRepository);

  // Criar o service com os use cases
  const userFollowService = new UserFollowService(
    createFollowUseCase,
    deleteFollowUseCase,
    getFollowersUseCase,
    getFollowingUseCase,
    getFollowStatsUseCase,
    checkIsFollowingUseCase
  );

  return new UserFollowController(userFollowService);
}