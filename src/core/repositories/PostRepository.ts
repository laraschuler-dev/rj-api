import { AttendEventDTO } from '../dtos/AttendEventDTO';
import { CommentDTO } from '../dtos/ComentListDTO';
import { CreateCommentDTO } from '../dtos/CreateCommentDTO';
import { Post } from '../entities/Post';
import { post, Prisma } from '@prisma/client';
import { comment as PrismaComment } from '@prisma/client';
import { PostLikeDTO } from '../dtos/PostLikeDTO';
import { PrismaClient, post_share } from '@prisma/client';

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
    limit: number,
    userId?: number // Adicione este parâmetro opcional
  ): Promise<{ posts: Post[]; total: number }>;

  getSharedPostByIdWithDetails(
    shareId: number
  ): Promise<PostWithAllDetails | null>;

  getPostByIdWithDetails(postId: number): Promise<PostWithAllDetails | null>;

  likePost(postId: number, userId: number, postShareId?: number): Promise<void>;

  findLikesByPost(postId: number, shareId?: number): Promise<PostLikeDTO[]>;

  unlikePost(
    postId: number,
    userId: number,
    postShareId?: number
  ): Promise<void>;

  isPostLikedByUser(
    postId: number,
    userId: number,
    shareId?: number
  ): Promise<boolean>;

  countLikesByPostId(postId: number, shareId?: number): Promise<number>;

  findPostShareById(shareId: number): Promise<post_share | null>;

  sharePost(userId: number, postId: number, message?: string): Promise<void>;

  countSharesByPostId(postId: number): Promise<number>;

  findShareById(id: number): Promise<any | null>;

  createComment(createCommentDTO: CreateCommentDTO): Promise<Comment>;

  findCommentsByPostId(postId: number): Promise<CommentDTO[]>;

  getSingleComment(commentId: number): Promise<CommentDTO | null>;

  countCommentsByPostId(postId: number): Promise<number>;

  attendEvent(data: AttendEventDTO): Promise<void>;

  findAttendance(postId: number, userId: number): Promise<any>;

  removeAttendance(postId: number, userId: number): Promise<void>;

  findCategoryById(id: number): Promise<{
    idcategory: number;
    nome: string;
    required_fields: string | null;
  } | null>;

  findPostsByUser(
    userId: number,
    page: number,
    limit: number
  ): Promise<{ posts: Post[]; totalCount: number }>;

  update(postId: number, data: Partial<Post>): Promise<void>;

  deleteImage(postId: number, imageId: number): Promise<void>;

  findImageOwner(imageId: number): Promise<{
    postId: number;
    userId: number;
  } | null>;

  updateComment(commentId: number, content: string): Promise<void>;

  findCommentById(commentId: number): Promise<PrismaComment | null>;

  softDeleteComment(commentId: number): Promise<void>;

  softDeletePost(postId: number): Promise<void>;

  findPostAuthor(postId: number): Promise<number | null>;
}
