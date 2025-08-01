export class PostLikeCountDTO {
  constructor(
    public readonly postId: number,
    public readonly totalLikes: number,
    public readonly uniqueKey: string
  ) {}

  static fromResult(
    postId: number,
    count: number,
    postShareData?: { id: number; userId: number; sharedAt: Date }
  ): PostLikeCountDTO {
    let uniqueKey: string;

    if (postShareData) {
      const timestamp = new Date(postShareData.sharedAt).getTime();
      uniqueKey = `shared:${postShareData.userId}:${postId}:${timestamp}`;
    } else {
      uniqueKey = `post-${postId}`;
    }

    return new PostLikeCountDTO(postId, count, uniqueKey);
  }
}
