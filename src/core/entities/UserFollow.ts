// src/core/entities/UserFollow.ts
export class UserFollow {
  constructor(
    public readonly id: number,
    public readonly followerId: number,
    public readonly followingId: number,
    public readonly createdAt: Date
  ) {}
}
