export class LikePostResponseDTO {
  constructor(
    public readonly liked: boolean,
  ) {}

  static fromResult(
    liked: boolean,
  ): LikePostResponseDTO {
    return new LikePostResponseDTO(liked);
  }
}
