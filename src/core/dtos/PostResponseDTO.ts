import { Post, PostMetadata } from "../entities/Post";
import { User } from "../entities/User";

/**
 * Data Transfer Object (DTO) para a resposta de um post.
 * 
 * Essa classe contém as propriedades necessárias para representar a resposta de um post.
 */

export class PostResponseDTO {
  /**
   * Construtor da classe PostResponseDTO.
   * 
   * @param id - ID do post.
   * @param content - Conteúdo do post.
   * @param categoria_idcategoria - ID da categoria do post.
   * @param user_iduser - ID do usuário que criou o post.
   * @param metadata - Metadados do post.
   * @param createdAt - Data de criação do post.
   */
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

/**
   * Método para transformar a entidade Post em DTO.
   * 
   * @param post - Entidade Post.
   * @param user - Usuário que criou o post.
   * @returns O DTO do post.
   */
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