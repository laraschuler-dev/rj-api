import { PostDetailsDTO } from '../../core/dtos/PostDetailsDTO';
import { Post, PostMetadata } from '../../core/entities/Post';
import { PostService } from '../services/PostService';
import { SharePostDTO } from '../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../core/dtos/AttendEvent/AttendEventDTO';
import { GetUserPostsDTO } from '../../core/dtos/GetUserPostsDTO';
import { UpdatePostDTO } from '../../core/dtos/UpdatePostDTO';
import { DeletePostImageDTO } from '../../core/dtos/DeletePostImageDTO';
import { UpdateCommentDTO } from '../../core/dtos/UpdateCommentDTO';
import { DeleteCommentDTO } from '../../core/dtos/DeleteCommentDTO';
import { DeletePostDTO } from '../../core/dtos/DeletePostDTO';
import { CommentDTO } from '../../core/dtos/ComentListDTO';
import { LikePostResponseDTO } from '../../core/dtos/LikePostResponseDTO';
import { PostLikeDTO } from '../../core/dtos/PostLikeDTO';
import { PostLikeCountDTO } from '../../core/dtos/PostLikeCountDTO';
import { CommentCountDTO } from '../../core/dtos/CommentCountDTO';
import { PostShareCountDTO } from '../../core/dtos/PostShareCountDTO';
import { SharedPostDetailsDTO } from '../../core/dtos/SharedPostDetailsDTO';
import { CommentDetailDTO } from '../../core/dtos/CommentDetailDTO';
import { GetAttendanceStatusDTO } from '@/core/dtos/AttendEvent/GetAttendanceStatusDTO';
import { AttendanceStatusResponseDTO } from '@/core/dtos/AttendEvent/AttendanceStatusResponseDTO';
import { PostListItemDTO } from '@/core/dtos/PostListItemDTO';

interface PaginatedPostsResult {
  posts: Post[];
  total: number;
}

/**
 * Caso de uso para gerenciar posts.
 *
 * Esse caso de uso fornece métodos para criar e gerenciar posts.
 */

export class PostUseCases {
  postRepository: any;
  /**
   * Construtor da classe PostUseCases.
   *
   * @param postService - Instância do serviço de posts.
   */
  constructor(private readonly postService: PostService) {}

  /**
   * Executa o caso de uso para criar um novo post.
   *
   * @param content - Conteúdo do post.
   * @param categoria_idcategoria - ID da categoria do post.
   * @param user_iduser - ID do usuário que criou o post.
   * @param metadata - Metadados do post.
   * @param imageFilenames - Nomes dos arquivos de imagem do post.
   * @returns O post criado.
   */

  async execute(
    content: string,
    categoria_idcategoria: number,
    user_iduser: number,
    metadata: PostMetadata,
    imageFilenames: string[] = []
  ): Promise<{ post: Post; images: string[] }> {
    const post = new Post(
      null,
      content,
      categoria_idcategoria,
      user_iduser,
      metadata
    );
    (post as any).images = imageFilenames;

    return this.postService.createPost(post);
  }

  /**
   * Executa o caso de uso para buscar posts de forma paginada.
   *
   * @param page - Número da página a ser buscada.
   * @param limit - Número de posts por página.
   * @returns Um objeto contendo um array de posts e o número total de posts.
   */
  async listPaginatedPosts(
    page: number,
    limit: number,
    userId?: number
  ): Promise<{
    posts: PostListItemDTO[];
    total: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
  }> {
    return this.postService.listPaginatedPosts(page, limit, userId);
  }

  async getPostById(postId: number, userId: number) {
    const post = await this.postService.getPostByIdWithDetails(postId, userId);
    if (!post) return null;
    return PostDetailsDTO.fromPrisma(post, userId);
  }

  async getSharedPostById(shareId: number, userId: number, postId: number) {
    const sharedData = await this.postService.getSharedPostDetails(
      shareId,
      userId,
      postId
    );

    if (!sharedData) {
      return null;
    }

    return sharedData;
  }

  async deletePost(data: DeletePostDTO): Promise<void> {
    return this.postService.deletePost(data);
  }

  async toggleLike(postId: number, userId: number, postShareId?: number) {
    return this.postService.toggleLike(postId, userId, postShareId);
  }

  async listLikes(postId: number, shareId?: number): Promise<PostLikeDTO[]> {
    return this.postService.getLikesByPost(postId, shareId);
  }

  async getLikeCount(
    postId: number,
    shareId?: number
  ): Promise<PostLikeCountDTO> {
    return this.postService.getLikeCount(postId, shareId);
  }

  async sharePost(sharePostDTO: SharePostDTO): Promise<PostListItemDTO> {
    return await this.postService.sharePost(sharePostDTO);
  }

  async getShareCount(postId: number): Promise<PostShareCountDTO> {
    return this.postService.getShareCount(postId);
  }

  async commentPost(createCommentDTO: CreateCommentDTO): Promise<void> {
    return this.postService.createComment(createCommentDTO);
  }

  async listComments(postId: number, postShareId?: number) {
    return this.postService.getCommentsByPostId(postId, postShareId);
  }

  async getSingleComment(commentId: number): Promise<CommentDetailDTO | null> {
    return this.postService.getSingleComment(commentId);
  }

  async getCommentCount(
    postId: number,
    postShareId?: number
  ): Promise<CommentCountDTO> {
    return this.postService.getCommentCount(postId, postShareId);
  }

  async attendEvent(data: AttendEventDTO): Promise<'confirmed' | 'removed'> {
    return this.postService.attendEvent(data);
  }

  async getAttendanceStatus(
    data: GetAttendanceStatusDTO
  ): Promise<AttendanceStatusResponseDTO> {
    return this.postService.getAttendanceStatus(data);
  }

  async getPostsByUser(dto: GetUserPostsDTO) {
  console.log('📋 UseCase - dto recebido:', dto);
  console.log('👤 UseCase - requestingUserId:', dto.requestingUserId);
  
  const result = await this.postService.getPostsByUser(dto);
  return result;
}

  async updatePost(data: UpdatePostDTO): Promise<Post | any> {
    return this.postService.updatePost(data);
  }

  async deleteImage(data: DeletePostImageDTO): Promise<void> {
    return this.postService.deleteImage(data);
  }

  async updateComment(data: UpdateCommentDTO): Promise<void> {
    return this.postService.updateComment(data);
  }

  async deleteComment(data: DeleteCommentDTO): Promise<void> {
    return this.postService.deleteComment(data);
  }
}
