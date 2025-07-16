export class CommentCountDTO {
  constructor(
    public readonly postId: number,
    public readonly totalComments: number
  ) {}

  static fromResult(postId: number, count: number): CommentCountDTO {
    return new CommentCountDTO(postId, count);
  }
}
