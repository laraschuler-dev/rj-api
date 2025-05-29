import { Post, PostMetadata } from "../entities/Post";
import { User } from "../entities/User";

export class PostResponseDTO {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly categoria_idcategoria: number,
    public readonly user_iduser: {
      id: number;
      name: string;
      avatarUrl?: string;
    },
    public readonly metadata: PostMetadata,
    public readonly createdAt: string
  ) {}

  // Método para transformar a entidade Post em DTO
  static fromDomain(post: Post, user: User): PostResponseDTO {
    return new PostResponseDTO(
      post.id!,
      post.content,
      post.categoria_idcategoria,
      {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl
      },
      post.metadata,
      post.createdAt.toISOString()
    );
  }
}