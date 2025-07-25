import { PostDetailsDTO } from '../../core/dtos/PostDetailsDTO';
import { Post, PostMetadata } from '../../core/entities/Post';
import { PostService } from '../services/PostService';
import { SharePostDTO } from '../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../core/dtos/AttendEventDTO';
import { GetUserPostsDTO } from '@/core/dtos/GetUserPostsDTO';
import { UpdatePostDTO } from '@/core/dtos/UpdatePostDTO';
import { DeletePostImageDTO } from '@/core/dtos/DeletePostImageDTO';
import { UpdateCommentDTO } from '@/core/dtos/UpdateCommentDTO';
import { DeleteCommentDTO } from '@/core/dtos/DeleteCommentDTO';
import { DeletePostDTO } from '@/core/dtos/DeletePostDTO';
import { CommentDTO } from '@/core/dtos/ComentListDTO';
import { LikePostResponseDTO } from '@/core/dtos/LikePostResponseDTO';
import { PostLikeDTO } from '@/core/dtos/PostLikeDTO';
import { PostLikeCountDTO } from '@/core/dtos/PostLikeCountDTO';
import { CommentCountDTO } from '@/core/dtos/CommentCountDTO';
import { PostShareCountDTO } from '@/core/dtos/PostShareCountDTO';

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
  ): Promise<Post> {
    const post = new Post(
      null,
      content,
      categoria_idcategoria,
      user_iduser,
      metadata
    );
    (post as any).images = imageFilenames; // temporário para passar dados ao repositório
    return this.postService.createPost(post);
  }

  /**
   * Executa o caso de uso para buscar posts de forma paginada.
   *
   * @param page - Número da página a ser buscada.
   * @param limit - Número de posts por página.
   * @returns Um objeto contendo um array de posts e o número total de posts.
   */
  /*async listPaginated(page: number, limit: number, userId?: number) {
    return this.postService.getPaginatedPosts(page, limit, userId);
  }*/

  async listPaginatedPosts(
    page: number,
    limit: number,
    userId?: number
  ): Promise<{ posts: Post[]; total: number }> {
    return this.postService.listPaginatedPosts(page, limit, userId);
  }

  async getPostById(postId: number, userId: number) {
    const post = await this.postService.getPostByIdWithDetails(postId);
    if (!post) return null;
    return PostDetailsDTO.fromPrisma(post, userId);
  }

  getPostByIdWithDetails(id: number) {
    return this.postService.getPostByIdWithDetails(id);
  }

  async deletePost(data: DeletePostDTO): Promise<void> {
    return this.postService.deletePost(data);
  }

  async toggleLike(postId: number, userId: number) {
    return this.postService.toggleLike(postId, userId);
  }

  async listLikes(postId: number): Promise<PostLikeDTO[]> {
    return this.postService.getLikesByPost(postId);
  }

  async getLikeCount(postId: number): Promise<PostLikeCountDTO> {
    return this.postService.getLikeCount(postId);
  }

  async sharePost(sharePostDTO: SharePostDTO): Promise<void> {
    await this.postService.sharePost(sharePostDTO);
  }

  async getShareCount(postId: number): Promise<PostShareCountDTO> {
    return this.postService.getShareCount(postId);
  }

  async commentPost(
    createCommentDTO: CreateCommentDTO,
    userId: number
  ): Promise<void> {
    await this.postService.createComment(createCommentDTO, userId);
  }

  async listComments(postId: number) {
    return this.postService.getCommentsByPostId(postId);
  }

  async getSingleComment(commentId: number): Promise<CommentDTO | null> {
    return this.postService.getSingleComment(commentId);
  }

  async getCommentCount(postId: number): Promise<CommentCountDTO> {
    return this.postService.getCommentCount(postId);
  }

  async attendEvent(
    data: AttendEventDTO
  ): Promise<'interested' | 'confirmed' | 'removed'> {
    return this.postService.attendEvent(data);
  }

  async getPostsByUser(dto: GetUserPostsDTO) {
    return this.postService.getPostsByUser(dto);
  }

  async updatePost(data: UpdatePostDTO): Promise<void> {
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
