export class PostShareCountDTO {
  constructor(
    public readonly totalShares: number
  ) {}

  static fromResult(count: number): PostShareCountDTO {
    return new PostShareCountDTO( count);
  }
}
