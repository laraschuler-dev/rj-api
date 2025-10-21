// src/core/dtos/user/SearchedUserDTO.ts
export class SearchedUserDTO {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly avatarUrl?: string,
    public readonly profileType?: string
  ) {}
}