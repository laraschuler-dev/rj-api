export class PostShareCountDTO {
  constructor(
    public readonly postId: number,
    public readonly totalShares: number
  ) {}

  static fromResult(postId: number, count: number): PostShareCountDTO {
    return new PostShareCountDTO(postId, count);
  }
}
