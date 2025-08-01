export class LikePostResponseDTO {
  constructor(
    public readonly liked: boolean,
    public readonly uniqueKey: string
  ) {}

  static fromResult(
    liked: boolean,
    postId?: number,
    postShareId?: number,
    sharedById?: number,
    sharedAt?: Date
  ): LikePostResponseDTO {
    const uniqueKey =
      postShareId && sharedById && sharedAt
        ? `shared:${sharedById}:${postId}:${sharedAt.getTime()}`
        : `post:${postId}`;

    return new LikePostResponseDTO(liked, uniqueKey);
  }
}
