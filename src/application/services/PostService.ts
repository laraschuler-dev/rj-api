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
import { AttendanceStatusResponseDTO } from '../../core/dtos/AttendEvent/AttendanceStatusResponseDTO';
import { GetAttendanceStatusDTO } from '../../core/dtos/AttendEvent/GetAttendanceStatusDTO';
import {
  AuthorDTO,
  PostListItemDTO,
  SharedByDTO,
} from '../../core/dtos/PostListItemDTO';
import { UserRepository } from '../../core/repositories/UserRepository';
import { PostDetailsDTO } from '../../core/dtos/PostDetailsDTO';
import { EditedPostDTO } from '../../core/dtos/EditedPostDTO';
import { EditedSharedPostDTO } from '../../core/dtos/EditedSharedPostDTO';
import { NotificationService } from './NotificationService';

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
  constructor(
    private readonly repository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationService: NotificationService
  ) {}

  /**
   * Cria um novo post.
   *
   * @param post - Objeto post que será criado.
   * @returns O post criado.
   * @throws Erro caso os campos sejam inválidos ou campos obrigatórios faltando.
   */
  async createPost(post: Post): Promise<{ post: Post; images: string[] }> {
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
    const { postId, shareId, userId } = data;

    if (shareId) {
      // Exclusão de compartilhamento
      const share = await this.repository.findPostShareById(shareId);
      if (!share) throw new Error('Compartilhamento não encontrado');
      if (share.user_iduser !== userId) {
        throw new Error(
          'Usuário não autorizado a excluir este compartilhamento'
        );
      }

      await this.repository.softDeleteShare(shareId);
      return;
    }

    // Exclusão de post original
    const authorId = await this.repository.findPostAuthor(postId!);
    if (!authorId) throw new Error('Post não encontrado');
    if (authorId !== userId) throw new Error('Usuário não autorizado');

    await this.repository.softDeletePost(postId!);
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
    posts: PostListItemDTO[];
    total: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
  }> {
    const result = await this.repository.findManyPaginated(page, limit, userId);

    const validPosts = [];

    for (const post of result.posts) {
      try {
        const author = await this.userRepository.findByIdUser(post.user_iduser);
        if (author) {
          const postDTO = PostListItemDTO.fromDomain(
            post,
            author,
            post.images,
            userId
          );
          validPosts.push(postDTO);
        }
      } catch (error) {
        console.warn(
          `Post ${post.id} ignorado devido a autor inválido:`,
          error instanceof Error ? error.message : 'Erro desconhecido'
        );
      }
    }

    return {
      posts: validPosts,
      total: result.total,
      currentPage: page,
      limit,
      totalPages: Math.ceil(result.total / limit),
      hasNext: page * limit < result.total,
    };
  }

  async getPostByIdWithDetails(id: number, userId: number) {
    const post = await this.repository.getPostByIdWithDetails(id);

    if (!post || post.deleted) {
      return null;
    }

    // 👇 Converta para DTO aqui mesmo no service
    return PostDetailsDTO.fromPrisma(post, userId);
  }

  async getSharedPostDetails(shareId: number, userId: number, postId: number) {
    const post = await this.repository.findById(postId);
    if (!post) {
      return null;
    }

    const share = await this.repository.findPostShareById(shareId);
    if (!share || share.post_idpost !== postId) {
      return null;
    }

    const sharedDetails =
      await this.repository.getSharedPostByIdWithDetails(shareId);
    if (!sharedDetails) {
      return null;
    }

    return SharedPostDetailsDTO.fromPrisma(sharedDetails, userId);
  }

  /**
   * Obtém o ID do usuário que deve receber a notificação
   * Para posts originais: dono do post
   * Para compartilhamentos: dono do compartilhamento
   */
  private async getNotificationTargetUserId(
    postId: number,
    shareId?: number | null
  ): Promise<number | null> {
    try {
      const effectiveShareId =
        shareId === null || shareId === undefined ? undefined : shareId;

      if (effectiveShareId) {
        // É um compartilhamento - retorna dono do COMPARTILHAMENTO
        const share = await this.repository.findPostShareById(effectiveShareId);
        return share?.user_iduser || null;
      } else {
        // É post original - retorna dono do POST
        const post = await this.repository.findById(postId);
        return post?.user_iduser || null;
      }
    } catch (error) {
      console.error('Erro ao buscar target user para notificação:', error);
      return null;
    }
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

      // 👇 HOOK DE NOTIFICAÇÃO DE CURTIDA - CORRIGIDO
      try {
        // ✅ CORREÇÃO: Usa método auxiliar para determinar quem notificar
        const targetUserId = await this.getNotificationTargetUserId(
          postId,
          shareId
        );

        if (targetUserId && targetUserId !== userId) {
          // Não notificar a si mesmo
          await this.notificationService.createNotification({
            user_id: targetUserId,
            actor_id: userId,
            type: 'LIKE',
            post_id: postId,
            post_share_id: shareId,
          });
        }
      } catch (error) {
        console.error('Erro ao criar notificação de curtida:', error);
        // Não quebra o fluxo principal se a notificação falhar
      }
    }

    // Resto do método permanece igual...
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

    let count: number;

    if (shareId) {
      const shareData = await this.repository.findPostShareById(shareId);
      if (!shareData) throw new Error('Compartilhamento não encontrado');

      count = await this.repository.countLikesByPostId(postId, shareId);
    } else {
      count = await this.repository.countLikesByPostId(postId);
    }

    return new PostLikeCountDTO(count);
  }

  async sharePost(dto: SharePostDTO): Promise<PostListItemDTO> {
    const {
      shared,
      post: originalPost,
      user: sharingUser,
    } = await this.repository.sharePost(dto.userId, dto.postId, dto.message);

    if (!originalPost) {
      throw new Error('Post original não encontrado');
    }

    if (!sharingUser) {
      throw new Error('Usuário não encontrado');
    }

    try {
      if (originalPost.user.iduser !== dto.userId) {
        // Não notificar a si mesmo
        await this.notificationService.createNotification({
          user_id: originalPost.user.iduser,
          actor_id: dto.userId,
          type: 'SHARE',
          post_id: dto.postId,
          post_share_id: shared.id,
        });
      }
    } catch (error) {
      console.error('Erro ao criar notificação de compartilhamento:', error);
    }

    const images = originalPost.image.map(
      (img: { image: string }) => img.image
    );

    const metadata =
      typeof originalPost.metadata === 'string'
        ? JSON.parse(originalPost.metadata)
        : originalPost.metadata;

    const author: AuthorDTO = {
      id: originalPost.user.iduser,
      name: originalPost.user.name,
      avatarUrl: originalPost.user.user_profile?.profile_photo || undefined,
    };

    const sharedBy: SharedByDTO = {
      shareId: shared.id,
      postId: originalPost.idpost,
      id: sharingUser.iduser,
      name: sharingUser.name,
      avatarUrl: sharingUser.user_profile?.profile_photo || undefined,
      message: shared.message ?? undefined,
      sharedAt: shared.shared_at.toISOString(),
    };

    return new PostListItemDTO(
      `shared:${sharingUser.iduser}:${originalPost.idpost}:${new Date(shared.shared_at).getTime()}`,
      originalPost.idpost,
      originalPost.content,
      originalPost.categoria_idcategoria,
      author,
      metadata,
      images,
      originalPost.time.toISOString(),
      false,
      false,
      true,
      sharedBy
    );
  }

  async getShareCount(postId: number): Promise<PostShareCountDTO> {
    const post = await this.repository.findById(postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    const count = await this.repository.countSharesByPostId(postId);
    return PostShareCountDTO.fromResult(count);
  }

  async createComment(createCommentDTO: CreateCommentDTO): Promise<void> {
    const { userId, postId, shareId } = createCommentDTO;

    const post = await this.repository.findById(postId);
    if (!post) throw new Error('Post não encontrado');

    if (shareId) {
      const share = await this.repository.findPostShareById(shareId);
      if (!share) throw new Error('Compartilhamento não encontrado');
    }

    const comment = await this.repository.createComment(createCommentDTO);

    try {
      const targetUserId = await this.getNotificationTargetUserId(
        postId,
        shareId
      );

      if (targetUserId && targetUserId !== userId) {
        await this.notificationService.createNotification({
          user_id: targetUserId,
          actor_id: userId,
          type: 'COMMENT',
          post_id: postId,
          post_share_id: shareId,
          comment_id: comment.idcomment,
        });
      }
    } catch (error) {
      console.error('Erro ao criar notificação de comentário:', error);
      // Não quebra o fluxo principal
    }
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
    return CommentCountDTO.fromResult(count);
  }

  // 🔨 SUBSTITUIR O MÉTODO attendEvent EXISTENTE
  async attendEvent(data: AttendEventDTO): Promise<'confirmed' | 'removed'> {
    const postShareId = data.postShareId ?? undefined;

    const post = await this.repository.findById(data.postId);
    if (!post) throw new Error('Post não encontrado');

    if (post.categoria_idcategoria !== 8) {
      throw new Error('Este post não permite confirmação de presença');
    }

    const currentAttendance = await this.repository.findAttendance(
      data.postId,
      data.userId,
      postShareId
    );

    if (currentAttendance?.status === 'confirmed') {
      await this.repository.removeAttendance(
        data.postId,
        data.userId,
        postShareId
      );
      return 'removed';
    }

    await this.repository.attendEvent({
      ...data,
      postShareId,
      status: 'confirmed',
    });

    // 👇 HOOK DE NOTIFICAÇÃO DE CONFIRMAÇÃO EM EVENTO - CORRIGIDO
    try {
      // ✅ CORREÇÃO: Usa método auxiliar para determinar quem notificar
      const targetUserId = await this.getNotificationTargetUserId(
        data.postId,
        postShareId
      );

      if (targetUserId && targetUserId !== data.userId) {
        // Não notificar a si mesmo
        await this.notificationService.createNotification({
          user_id: targetUserId, // ✅ Agora é o dono CORRETO
          actor_id: data.userId, // Quem confirmou presença
          type: 'EVENT_ATTENDANCE',
          post_id: data.postId,
          post_share_id: postShareId,
        });
      }
    } catch (error) {
      console.error('Erro ao criar notificação de evento:', error);
      // Não quebra o fluxo principal
    }

    return 'confirmed';
  }

  async getAttendanceStatus(
    data: GetAttendanceStatusDTO
  ): Promise<AttendanceStatusResponseDTO> {
    const { postId, postShareId, userId } = data;
    return this.repository.getAttendanceStatus({ postId, postShareId, userId });
  }

  async getPostsByUser(dto: GetUserPostsDTO) {
    const { userId, requestingUserId, page = 1, limit = 10 } = dto;

    if (page < 1 || limit < 1 || limit > 100) {
      throw new Error('Parâmetros de paginação inválidos');
    }

    // Busca o usuário que fez os posts
    const userExists = await this.userRepository.findByIdUser(userId);
    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    // VERIFICAÇÃO OPCIONAL: usuário excluído
    const isUserDeleted = await this.userRepository.isUserDeleted(userId);
    if (isUserDeleted) {
      throw new Error('Usuário não encontrado');
    }

    const { posts, totalCount } = await this.repository.findPostsByUser(
      userId,
      requestingUserId,
      page,
      limit
    );

    // 👇 CORREÇÃO: Busca o autor CORRETO para cada post
    const postDTOs = await Promise.all(
      posts.map(async (post) => {
        // Para posts compartilhados, busca o autor do post ORIGINAL
        let author = userExists;

        if (post.sharedBy) {
          // É um compartilhamento - busca o autor do post original
          const originalPost = await this.repository.findById(
            post.sharedBy.postId
          );
          if (originalPost) {
            const originalAuthor = await this.userRepository.findByIdUser(
              originalPost.user_iduser
            );
            if (originalAuthor) {
              author = originalAuthor;
            }
          }
        }
        // Para posts originais, mantém o userExists como autor

        return PostListItemDTO.fromDomain(
          post,
          author, // 👈 Agora usa o autor CORRETO
          post.images,
          requestingUserId
        );
      })
    );

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: postDTOs,
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

  async updatePost(data: UpdatePostDTO): Promise<any> {
    if (data.shareId) {
      const share = await this.repository.findPostShareById(data.shareId);
      if (!share) throw new Error('Compartilhamento não encontrado');
      if (share.user_iduser !== data.userId) {
        throw new Error(
          'Usuário não autorizado a editar este compartilhamento'
        );
      }

      await this.repository.updateShare(data.shareId, {
        message: data.message ?? '',
      });

      const sharedPostDetails =
        await this.repository.getSharedPostByIdWithDetails(data.shareId);
      if (!sharedPostDetails)
        throw new Error('Post compartilhado não encontrado');

      // 👇 usar o novo DTO
      return EditedSharedPostDTO.fromPrisma(sharedPostDetails, data.userId);
    }

    const post = await this.repository.findById(data.postId!);
    if (!post) throw new Error('Post não encontrado');
    if (post.user_iduser !== data.userId) {
      throw new Error('Usuário não autorizado a editar este post');
    }

    if (!data.content || data.content.trim() === '') {
      throw new Error('O conteúdo não pode estar vazio.');
    }

    const currentImages = await this.repository.getImagesByPostId(data.postId!);
    const totalImages = currentImages.length;
    const newImgs = data.newImages ?? [];

    if (totalImages + newImgs.length > 5) {
      throw new Error(`O post já possui ${totalImages} imagens.`);
    }

    const updatedPost = await this.repository.update(data.postId!, {
      content: data.content,
      metadata: data.metadata,
      newImages: data.newImages,
    });

    // 👇 usar o novo DTO
    return EditedPostDTO.fromPrisma(updatedPost, data.userId);
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
