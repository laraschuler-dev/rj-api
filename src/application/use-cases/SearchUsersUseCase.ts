// src/core/useCases/user/SearchUsersUseCase.ts

import { SearchedUserDTO } from "../../core/dtos/SearchedUserDTO";
import { UserRepository } from "../../core/repositories/UserRepository";


export class SearchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    searchTerm: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    users: SearchedUserDTO[];
    totalCount: number;
  }> {
    if (!searchTerm || searchTerm.trim().length < 2) {
      throw new Error('Termo de busca deve ter pelo menos 2 caracteres');
    }

    const result = await this.userRepository.searchUsers(
      searchTerm,
      page,
      limit
    );

    const users = result.users.map(
      (user) =>
        new SearchedUserDTO(
          user.id,
          user.name,
          user.email,
          user.avatarUrl,
          user.profileType
        )
    );

    return {
      users,
      totalCount: result.totalCount,
    };
  }
}
