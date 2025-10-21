export class CommentCountDTO {
  constructor(
    public readonly totalComments: number
  ) {}

  static fromResult(count: number): CommentCountDTO {
    return new CommentCountDTO(count);
  }
}
