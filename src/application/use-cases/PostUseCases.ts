import { PostDetailsDTO } from '../../core/dtos/PostDetailsDTO';
import { Post, PostMetadata } from '../../core/entities/Post';
import { PostService } from '../services/PostService';
import { SharePostDTO } from '../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../core/dtos/AttendEventDTO';

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
  async listPaginated(page: number, limit: number) {
    return this.postService.getPaginatedPosts(page, limit);
  }

  async getPostById(postId: number, userId: number) {
    const post = await this.postService.getPostByIdWithDetails(postId);
    if (!post) return null;
    return PostDetailsDTO.fromPrisma(post, userId);
  }

  getPostByIdWithDetails(id: number) {
    return this.postService.getPostByIdWithDetails(id);
  }

  async toggleLike(postId: number, userId: number) {
    return this.postService.toggleLike(postId, userId);
  }

  async sharePost(sharePostDTO: SharePostDTO): Promise<void> {
    await this.postService.sharePost(sharePostDTO);
  }

  async commentPost(
    createCommentDTO: CreateCommentDTO,
    userId: number
  ): Promise<void> {
    await this.postService.createComment(createCommentDTO, userId);
  }

  async attendEvent(data: AttendEventDTO): Promise<'interested' | 'confirmed' | 'removed'> {
  return this.postService.attendEvent(data);
}

}
