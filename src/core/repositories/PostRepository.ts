import { AttendEventDTO } from '../dtos/AttendEvent/AttendEventDTO';
import { CommentDTO } from '../dtos/ComentListDTO';
import { CreateCommentDTO } from '../dtos/CreateCommentDTO';
import { Post } from '../entities/Post';
import { post, Prisma } from '@prisma/client';
import { comment as PrismaComment } from '@prisma/client';
import { PostLikeDTO } from '../dtos/PostLikeDTO';
import { PrismaClient, post_share } from '@prisma/client';
import { CommentDetailDTO } from '../dtos/CommentDetailDTO';
import { GetAttendanceStatusDTO } from '../dtos/AttendEvent/GetAttendanceStatusDTO';
import { AttendanceStatusResponseDTO } from '../dtos/AttendEvent/AttendanceStatusResponseDTO';
import { User } from '../entities/User';

type CommentWithUser = Prisma.commentGetPayload<{ include: { user: true } }>;

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
  save(post: Post): Promise<{ post: Post; images: string[] }>;
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

  sharePost(userId: number, postId: number, message?: string): Promise<any>;

  countSharesByPostId(postId: number): Promise<number>;

  createComment(data: CreateCommentDTO): Promise<CommentWithUser>;

  findCommentsByPostId(
    postId: number,
    postShareId?: number
  ): Promise<CommentDTO[]>;

  getSingleComment(commentId: number): Promise<CommentDetailDTO | null>;

  countCommentsByPostId(postId: number, postShareId?: number): Promise<number>;

  attendEvent(data: AttendEventDTO): Promise<void>;

  findAttendance(
    postId: number,
    userId: number,
    postShareId?: number
  ): Promise<any>;

  removeAttendance(
    postId: number,
    userId: number,
    postShareId?: number
  ): Promise<void>;

  getAttendanceStatus(
    data: GetAttendanceStatusDTO
  ): Promise<AttendanceStatusResponseDTO>;

  findCategoryById(id: number): Promise<{
    idcategory: number;
    nome: string;
    required_fields: string | null;
  } | null>;

  findPostsByUser(
    userId: number,
    requestingUserId: number | undefined, // 👈 Novo parâmetro
    page: number,
    limit: number
  ): Promise<{ posts: Post[]; totalCount: number }>;

  update(
    postId: number,
    data: Partial<Post> & { existingImages?: string[]; newImages?: string[] }
  ): Promise<Post>;

  updateShare(shareId: number, data: { message: string }): Promise<void>;

  getImagesByPostId(postId: number): Promise<{ idimage: number }[]>;

  deleteImage(postId: number, imageId: number): Promise<void>;

  findImageOwner(imageId: number): Promise<{
    postId: number;
    userId: number;
  } | null>;

  updateComment(commentId: number, content: string): Promise<void>;

  findCommentById(commentId: number): Promise<{
    idcomment: number;
    post_idpost: number;
    post_share_id: number | null;
    user_iduser: number;
  } | null>;

  softDeleteComment(commentId: number): Promise<void>;

  softDeletePost(postId: number): Promise<void>;

  softDeleteShare(shareId: number): Promise<void>;

  findPostAuthor(postId: number): Promise<number | null>;
}
