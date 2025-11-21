// src/core/entities/UserSocialConnection.ts
export class UserSocialConnection {
  constructor(
    public id: number,
    public userId: number,
    public provider: string, // 'google', 'facebook', etc
    public providerId: string,
    public providerEmail: string,
    public createdAt: Date
  ) {}
}