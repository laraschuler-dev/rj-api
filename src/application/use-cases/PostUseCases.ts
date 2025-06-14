import { Post, PostMetadata } from '../../core/entities/Post';
import { PostService } from '../services/PostService';

/**
 * Caso de uso para gerenciar posts.
 *
 * Esse caso de uso fornece métodos para criar e gerenciar posts.
 */

export class PostUseCases {
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
}
