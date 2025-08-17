import { Post } from '../../core/entities/Post';
import { PostRepository } from '../../core/repositories/PostRepository';
import { prisma } from '../../infrastructure/database/prisma/prisma';
import { SharePostDTO } from '../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../core/dtos/AttendEvent/AttendEventDTO';
import { GetUserPostsDTO } from '../../core/dtos/GetUserPostsDTO';
import { UpdatePostDTO } from '../../core/dtos/UpdatePostDTO';
import { DeletePostImageDTO } from '../../core/dtos/DeletePostImageDTO';
import { UpdateCommentDTO } from '../../core/dtos/UpdateCommentDTO';
import { comment as PrismaComment } from '@prisma/client';
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
import { AttendanceStatusResponseDTO } from '@/core/dtos/AttendEvent/AttendanceStatusResponseDTO';
import { GetAttendanceStatusDTO } from '@/core/dtos/AttendEvent/GetAttendanceStatusDTO';
/**
 * Serviço responsável por gerenciar posts.
 *
 * Esse serviço fornece métodos para criar e gerenciar posts.
 */
export class PostService {
  useCase: any;
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
  async listPaginatedPosts(
    page: number,
    limit: number,
    userId?: number
  ): Promise<{
    posts: Post[];
    total: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
  }> {
    const result = await this.repository.findManyPaginated(page, limit, userId);

    return {
      ...result,
      currentPage: page,
      limit,
      totalPages: Math.ceil(result.total / limit),
      hasNext: page * limit < result.total,
    };
  }

  async getSharedPostDetails(shareId: number, userId: number, postId: number) {
  // Valida existência do post
  const post = await this.repository.findById(postId);
  if (!post) {
    return null; // Ou lance erro de post não encontrado
  }

  // Valida existência do compartilhamento
  const share = await this.repository.findPostShareById(shareId);
  if (!share || share.post_idpost !== postId) {
    // post_idpost deve existir no model post_share
    return null; // Compartilhamento não encontrado ou não pertence ao post
  }

  // Agora busca os detalhes para montar o DTO completo
  const sharedDetails = await this.repository.getSharedPostByIdWithDetails(shareId);

  if (!sharedDetails) {
    return null;
  }

  return SharedPostDetailsDTO.fromPrisma(sharedDetails, userId);
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
    userId: number,
    shareId?: number
  ): Promise<{
    liked: boolean;
    postId?: number;
    postShareId?: number;
    sharedById?: number;
    sharedAt?: Date;
  }> {
    const alreadyLiked = await this.repository.isPostLikedByUser(
      postId,
      userId,
      shareId
    );

    if (alreadyLiked) {
      await this.repository.unlikePost(postId, userId, shareId);
    } else {
      await this.repository.likePost(userId, postId, shareId);
    }

    const post = await this.repository.findById(postId);
    if (!post) throw new Error('Post não encontrado');

    if (shareId) {
      const share = await this.repository.findPostShareById(shareId);
      if (!share) throw new Error('Compartilhamento não encontrado');

      return {
        liked: !alreadyLiked,
        postShareId: shareId,
        sharedById: share?.user_iduser,
        sharedAt: share?.shared_at ?? undefined,
      };
    }

    return {
      liked: !alreadyLiked,
      postId,
    };
  }

  async getLikesByPost(
    postId: number,
    shareId?: number
  ): Promise<PostLikeDTO[]> {
    const post = await this.repository.findById(postId);
    if (!post) throw new Error('Post não encontrado');

    if (shareId) {
      const share = await this.repository.findPostShareById(shareId);
      if (!share) throw new Error('Compartilhamento não encontrado');
    }

    return this.repository.findLikesByPost(postId, shareId);
  }

  async getLikeCount(
    postId: number,
    shareId?: number
  ): Promise<PostLikeCountDTO> {
    const post = await this.repository.findById(postId);
    if (!post) throw new Error('Post não encontrado');

    const count = await this.repository.countLikesByPostId(postId, shareId);

    if (shareId) {
      const shareData = await this.repository.findPostShareById(shareId);
      if (!shareData) throw new Error('Compartilhamento não encontrado');

      if (!shareData.shared_at) {
        throw new Error('shared_at é obrigatório');
      }

      return PostLikeCountDTO.fromResult(postId, count, {
        id: shareId,
        userId: shareData.user_iduser,
        sharedAt: shareData.shared_at,
      });
    }

    return PostLikeCountDTO.fromResult(postId, count);
  }

  async sharePost(sharePostDTO: SharePostDTO): Promise<void> {
    const { postId, userId, message } = sharePostDTO;

    const post = await this.repository.findById(postId);

    if (!post) {
      throw new Error('Post não encontrado ou foi removido.');
    }

    if (message && message.length > 500) {
      throw new Error('A mensagem deve ter no máximo 500 caracteres');
    }

    await this.repository.sharePost(userId, postId, message);
  }

  async getShareCount(postId: number): Promise<PostShareCountDTO> {
    const post = await this.repository.findById(postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    const count = await this.repository.countSharesByPostId(postId);
    return PostShareCountDTO.fromResult(postId, count);
  }

  async createComment(
    createCommentDTO: CreateCommentDTO
  ): Promise<{ uniqueKey: string }> {
    const { userId, postId, shareId } = createCommentDTO;

    // Validação do post original (sempre obrigatória)
    const post = await this.repository.findById(postId);
    if (!post) throw new Error('Post não encontrado');

    // Validação do compartilhamento (se aplicável)
    if (shareId) {
      const share = await this.repository.findPostShareById(shareId);
      if (!share) throw new Error('Compartilhamento não encontrado');
    }

    // Criação do comentário
    const comment = await this.repository.createComment(createCommentDTO);

    const timestamp = comment.time
      ? new Date(comment.time).getTime()
      : Date.now();

    // Geração da uniqueKey
    const uniqueKey = shareId
      ? `shared:${comment.user.iduser}:${comment.post_idpost}:${timestamp}`
      : `post:${comment.user.iduser}:${comment.post_idpost}:${timestamp}`;

    return { uniqueKey };
  }

  async getCommentsByPostId(postId: number, postShareId?: number) {
    const post = await this.repository.findById(postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (postShareId) {
      const share = await this.repository.findPostShareById(postShareId);
      if (!share) throw new Error('Compartilhamento não encontrado');
    }
    return this.repository.findCommentsByPostId(postId, postShareId);
  }

  async getSingleComment(commentId: number): Promise<CommentDetailDTO | null> {
    return this.repository.getSingleComment(commentId);
  }

  async getCommentCount(
    postId: number,
    postShareId?: number
  ): Promise<CommentCountDTO> {
    const post = await this.repository.findById(postId);
    if (!post) {
      throw new Error('Post original não encontrado');
    }

    // se for um compartilhamento, validar se ele também existe
    if (postShareId) {
      const shareExists = await this.repository.findPostShareById(postShareId);
      if (!shareExists) {
        throw new Error('Compartilhamento não encontrado');
      }
    }

    const count = await this.repository.countCommentsByPostId(
      postId,
      postShareId
    );
    return CommentCountDTO.fromResult(postId, count);
  }

  async attendEvent(
    data: AttendEventDTO
  ): Promise<'interested' | 'confirmed' | 'removed'> {
    // converte null para undefined para evitar erro TS
    const postShareId =
      data.postShareId === null ? undefined : data.postShareId;

    const post = await this.repository.findById(data.postId);
    if (!post) throw new Error('Post não encontrado');

    const category = await this.repository.findCategoryById(
      post.categoria_idcategoria
    );
    const EVENT_CATEGORY_ID = 8;

    if (post.categoria_idcategoria !== EVENT_CATEGORY_ID) {
      throw new Error('Este post não permite confirmação de presença');
    }

    const currentAttendance = await this.repository.findAttendance(
      data.postId,
      data.userId,
      postShareId // usa a variável declarada
    );

    if (currentAttendance?.status === data.status) {
      await this.repository.removeAttendance(
        data.postId,
        data.userId,
        postShareId // idem aqui
      );
      return 'removed';
    }

    await this.repository.attendEvent({
      ...data,
      postShareId, // idem aqui
    });

    return data.status;
  }

  async getAttendanceStatus(
    data: GetAttendanceStatusDTO
  ): Promise<AttendanceStatusResponseDTO> {
    const { postId, postShareId, userId } = data;
    return this.repository.getAttendanceStatus({ postId, postShareId, userId });
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
      images: data.images,
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
    const { postId, postShareId, commentId, userId, content } = data;

    if (!content || content.trim().length === 0) {
      throw new Error('O conteúdo do comentário não pode estar vazio.');
    }

    const comment = await this.repository.findCommentById(commentId);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    const isCommentLinkedToCorrectPost =
      (postShareId && comment.post_share_id === postShareId) ||
      (!postShareId && comment.post_idpost === postId);

    if (!isCommentLinkedToCorrectPost) {
      throw new Error(
        'Comentário não encontrado para este post ou compartilhamento.'
      );
    }

    if (comment.user_iduser !== userId) {
      throw new Error('Usuário não autorizado a editar este comentário.');
    }

    await this.repository.updateComment(commentId, content.trim());
  }

  async deleteComment(data: DeleteCommentDTO): Promise<void> {
    const { commentId, postId, postShareId } = data;

    if (!postId) {
      throw new Error('ID do post não fornecido');
    }

    const comment = await this.repository.findCommentById(commentId);

    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }

    if (comment.user_iduser !== data.userId) {
      throw new Error('Ação não permitida');
    }

    if (Number(comment.post_idpost) !== Number(postId)) {
      throw new Error('Comentário não pertence ao post especificado.');
    }

    // Se postShareId for fornecido, verificar se o comentário pertence a ele
    if (postShareId !== undefined) {
      if (Number(comment.post_share_id) !== Number(postShareId)) {
        throw new Error(
          'Comentário não pertence ao compartilhamento especificado.'
        );
      }

      // Validar se o compartilhamento existe
      const share = await this.repository.findPostShareById(postShareId);
      if (!share) {
        throw new Error('Compartilhamento não encontrado.');
      }
    }

    await this.repository.softDeleteComment(commentId);
  }
}
