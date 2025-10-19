// src/infrastructure/factories/makeUserSearchController.ts

import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { UserSearchService } from '../../../application/services/UserSearchService';
import { UserSearchController } from '../controllers/UserSearchController';
import { SearchUsersUseCase } from '../../../application/use-cases/SearchUsersUseCase';

export function makeUserSearchController(): UserSearchController {
  const userRepository = new UserRepositoryPrisma();
  const searchUsersUseCase = new SearchUsersUseCase(userRepository);
  const userSearchService = new UserSearchService(searchUsersUseCase);
  return new UserSearchController(userSearchService);
}