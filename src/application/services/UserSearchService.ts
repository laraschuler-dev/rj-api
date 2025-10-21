// src/application/services/UserSearchService.ts

import { SearchUsersUseCase } from "../use-cases/SearchUsersUseCase";


export class UserSearchService {
  constructor(private searchUsersUseCase: SearchUsersUseCase) {}

  async searchUsers(searchTerm: string, page: number = 1, limit: number = 10) {
    return this.searchUsersUseCase.execute(searchTerm, page, limit);
  }
}