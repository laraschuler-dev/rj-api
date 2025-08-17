import { Post } from '../entities/Post';
import { User } from '../entities/User';

export class PostListItemDTO {
  constructor(
    public readonly uniqueKey: string,
    public readonly id: number,
    public readonly content: string,
    public readonly categoria_idcategoria: number,
    public readonly user_iduser: {
      id: number;
      name: string;
      avatarUrl?: string;
    },
    public readonly metadata: any,
    public readonly images: string[],
    public readonly createdAt: string,
    public readonly liked: boolean,
    public readonly sharedBy?: {
      shareId: number;
      postId: number;
      id: number;
      name: string;
      avatarUrl?: string;
      message?: string;
      sharedAt: string;
    }
  ) {}

  static fromDomain(post: Post, user: User, images: string[]): PostListItemDTO {
    return new PostListItemDTO(
      post.getUniqueIdentifier(),
      post.id!,
      post.content,
      post.categoria_idcategoria,
      {
        id: user.id,
        name: user.name,
        avatarUrl: post.avatarUrl || user.avatarUrl,
      },
      post.metadata,
      images,
      post.createdAt.toISOString(),
      post.liked || false,
      post.sharedBy
        ? {
            shareId: post.sharedBy.shareId,
            postId: post.sharedBy.postId,
            id: post.sharedBy.id,
            name: post.sharedBy.name,
            avatarUrl: post.sharedBy.avatarUrl || undefined,
            message: post.sharedBy.message,
            sharedAt: post.sharedBy.sharedAt.toISOString(),
          }
        : undefined
    );
  }
}
