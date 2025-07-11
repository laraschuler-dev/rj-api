import { Post } from '../../core/entities/Post';
import { PostRepository } from '../../core/repositories/PostRepository';
import { prisma } from '../../infrastructure/database/prisma/prisma';
import { SharePostDTO } from '../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '@/core/dtos/CreateCommentDTO';

/**
 * Serviço responsável por gerenciar posts.
 *
 * Esse serviço fornece métodos para criar e gerenciar posts.
 */
export class PostService {
  /**
   * Construtor da classe PostService.
   *
   * @param repository - Instância do repositório de posts.
   */
  constructor(private readonly repository: PostRepository) {}

  /**
   * Cria um novo post.
   *
   * @param post - Objeto post que será criado.
   * @returns O post criado.
   * @throws Erro caso os campos sejam inválidos ou campos obrigatórios faltando.
   */
  async createPost(post: Post): Promise<Post> {
    const errors: string[] = [];

    if (!post.content || post.content.trim().length === 0) {
      errors.push('O conteúdo do post não pode estar vazio.');
    }

    const category = await prisma.category.findUnique({
      where: { idcategory: post.categoria_idcategoria },
    });

    if (!category?.required_fields) {
      errors.push('A categoria não possui definição de campos obrigatórios.');
    } else {
      try {
        const requiredFields: string[] = JSON.parse(category.required_fields);
        for (const field of requiredFields) {
          const value = post.metadata[field as keyof typeof post.metadata];
          if (value === undefined || value === null || value === '') {
            errors.push(`Campo obrigatório ausente: ${field}`);
          }
        }
      } catch {
        errors.push('Formato inválido dos campos obrigatórios da categoria.');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return this.repository.save(post);
  }

  /**
   * Busca posts de forma paginada.
   *
   * @param page - Número da página a ser buscada.
   * @param limit - Número de posts por página.
   * @returns Um objeto contendo um array de posts e o número total de posts.
   */
  async getPaginatedPosts(page: number, limit: number) {
    return this.repository.findManyPaginated(page, limit);
  }

  async getPostByIdWithDetails(id: number) {
    return this.repository.getPostByIdWithDetails(id);
  }

  async toggleLike(
    postId: number,
    userId: number
  ): Promise<{ liked: boolean }> {
    const alreadyLiked = await this.repository.isPostLikedByUser(
      postId,
      userId
    );
    if (alreadyLiked) {
      await this.repository.unlikePost(postId, userId);
      return { liked: false };
    } else {
      await this.repository.likePost(postId, userId);
      return { liked: true };
    }
  }

  async sharePost(sharePostDTO: SharePostDTO): Promise<void> {
    await this.repository.sharePost(sharePostDTO.userId, sharePostDTO.postId);
  }

  async createComment(
    createCommentDTO: CreateCommentDTO,
    userId: number
  ): Promise<void> {
    const post = await this.repository.findById(createCommentDTO.postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }

    await this.repository.createComment({
      postId: createCommentDTO.postId,
      userId,
      comment: createCommentDTO.comment,
    });
  }
}
