import { Post } from '../../core/entities/Post';
import { PostRepository } from '../../core/repositories/PostRepository';
import { prisma } from '../../infrastructure/database/prisma/prisma';
import { SharePostDTO } from '../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../core/dtos/AttendEventDTO';
import { GetUserPostsDTO } from '@/core/dtos/GetUserPostsDTO';
import { UpdatePostDTO } from '@/core/dtos/UpdatePostDTO';
import { DeletePostImageDTO } from '@/core/dtos/DeletePostImageDTO';
import { UpdateCommentDTO } from '@/core/dtos/UpdateCommentDTO';
import { comment as PrismaComment } from '@prisma/client';
import { DeleteCommentDTO } from '@/core/dtos/DeleteCommentDTO';
import { DeletePostDTO } from '@/core/dtos/DeletePostDTO';

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

  async deletePost(data: DeletePostDTO): Promise<void> {
    const { postId, userId } = data;

    const authorId = await this.repository.findPostAuthor(postId);
    if (!authorId) throw new Error('Post não encontrado');
    if (authorId !== userId) throw new Error('Usuário não autorizado');

    await this.repository.softDeletePost(postId);
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
    const post = await this.repository.getPostByIdWithDetails(id);

    if (!post || post.deleted) {
      return null;
    }

    return post;
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

  async attendEvent(
    data: AttendEventDTO
  ): Promise<'interested' | 'confirmed' | 'removed'> {
    const post = await this.repository.findById(data.postId);

    if (!post) {
      throw new Error('Post não encontrado');
    }

    // ✅ Verifica se é um post do tipo evento
    const category = await this.repository.findCategoryById(
      post.categoria_idcategoria
    );
    const EVENT_CATEGORY_ID = 8;

    if (post.categoria_idcategoria !== EVENT_CATEGORY_ID) {
      throw new Error('Este post não permite confirmação de presença');
    }

    const currentAttendance = await this.repository.findAttendance(
      data.postId,
      data.userId
    );

    if (currentAttendance?.status === data.status) {
      await this.repository.removeAttendance(data.postId, data.userId);
      return 'removed';
    }

    await this.repository.attendEvent(data);
    return data.status;
  }

  async getPostsByUser({ userId, page = 1, limit = 10 }: GetUserPostsDTO) {
    if (page < 1 || limit < 1 || limit > 100) {
      throw new Error('Parâmetros de paginação inválidos');
    }

    const userExists = await this.repository.findById(userId);
    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    const { posts, totalCount } = await this.repository.findPostsByUser(
      userId,
      page,
      limit
    );
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: posts,
      pagination: {
        currentPage: page,
        limit,
        totalItems: totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async updatePost(data: UpdatePostDTO): Promise<void> {
    const errors: string[] = [];

    const post = await this.repository.findById(data.postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (post.user_iduser !== data.userId) {
      throw new Error('Usuário não autorizado a editar este post');
    }

    if (!data.content || data.content.trim().length === 0) {
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
          const value = data.metadata?.[field];
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

    await this.repository.update(data.postId, {
      content: data.content,
      metadata: data.metadata,
      images: data.images, // ✅ agora repassamos as imagens também
    });
  }

  async deleteImage(data: DeletePostImageDTO): Promise<void> {
    const { postId, imageId, userId } = data;

    const owner = await this.repository.findImageOwner(imageId);
    if (!owner) throw new Error('Imagem não encontrada');
    if (owner.userId !== userId) throw new Error('Ação não permitida');

    if (owner.postId !== postId) {
      throw new Error('Imagem não pertence ao post informado');
    }

    await this.repository.deleteImage(postId, imageId);
  }

  async updateComment(data: UpdateCommentDTO): Promise<void> {
    const { postId, commentId, userId, content } = data;

    if (!content || content.trim().length === 0) {
      throw new Error('O conteúdo do comentário não pode estar vazio.');
    }

    const comment: PrismaComment | null =
      await this.repository.findCommentById(commentId);

    if (!comment || comment.post_idpost !== postId) {
      throw new Error('Comentário não encontrado.');
    }

    if (comment.user_iduser !== userId) {
      throw new Error('Usuário não autorizado a editar este comentário.');
    }

    await this.repository.updateComment(commentId, content.trim());
  }

  async deleteComment(data: DeleteCommentDTO): Promise<void> {
    const { commentId, postId } = data;

    // Verificação adicional para garantir que postId existe
    if (postId === undefined) {
      throw new Error('ID do post não fornecido');
    }

    const comment = await this.repository.findCommentById(commentId);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    if (Number(comment.post_idpost) !== Number(postId)) {
      throw new Error('Comentário não pertence ao post especificado.');
    }

    await this.repository.softDeleteComment(commentId);
  }
}
