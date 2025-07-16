export class PostLikeCountDTO {
  constructor(
    public readonly postId: number,
    public readonly totalLikes: number
  ) {}

  static fromResult(postId: number, count: number): PostLikeCountDTO {
    return new PostLikeCountDTO(postId, count);
  }
}
