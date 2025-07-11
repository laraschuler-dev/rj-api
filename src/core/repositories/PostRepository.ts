import { Post } from '../entities/Post';
import { Prisma } from '@prisma/client';

export type PostWithAllDetails = Prisma.postGetPayload<{
  include: {
    user: true;
    image: true;
    user_like: true;
    comment: true;
    event_attendance: true;
  };
}>;

/**
 * Interface para o repositório de posts.
 *
 * Essa interface define os métodos necessários para gerenciar posts.
 */
export interface PostRepository {
  /**
   * Método para salvar um post.
   *
   * @param post - Post a ser salvo.
   * @returns O post salvo.
   */
  save(post: Post): Promise<Post>;
  /**
   * Método para buscar um post por ID.
   *
   * @param id - ID do post a ser buscado.
   * @returns O post encontrado, ou null se não for encontrado.
   */
  findById(id: number): Promise<Post | null>;

  /**
   * Método para buscar posts de forma paginada.
   *
   * @param page - Número da página a ser buscada.
   * @param limit - Número de posts por página.
   * @returns Um objeto contendo um array de posts e o número total de posts.
   */
  findManyPaginated(
    page: number,
    limit: number
  ): Promise<{ posts: Post[]; total: number }>;

  getPostByIdWithDetails(postId: number): Promise<PostWithAllDetails | null>;

  likePost(postId: number, userId: number): Promise<void>;

  unlikePost(postId: number, userId: number): Promise<void>;

  isPostLikedByUser(postId: number, userId: number): Promise<boolean>;
  
}
