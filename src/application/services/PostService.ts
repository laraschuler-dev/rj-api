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
    private readonly userRepository: UserRepository
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

  async validatePostOrShare(postId: number, shareId?: number): Promise<void> {
    const post = await this.repository.findById(postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }

    if (shareId) {
      const share = await this.repository.findPostShareById(shareId);
      if (!share) {
        throw new Error('Compartilhamento não encontrado');
      }
    }
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

    const postsWithUniqueKeys = await Promise.all(
      result.posts.map(async (post) => {
        const author = await this.userRepository.findByIdUser(post.user_iduser);
        if (!author) throw new Error('Autor não encontrado');

        return PostListItemDTO.fromDomain(post, author, post.images, userId);
      })
    );

    return {
      posts: postsWithUniqueKeys,
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
      avatarUrl: sharingUser.user_profile?.profile_photo || undefined, // ✅ Correto
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
      false, // liked
      false, // isPostOwner (quem compartilha não é dono do post original)
      true, // isShareOwner (quem compartilha é dono deste compartilhamento)
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

    // Validação do post original
    const post = await this.repository.findById(postId);
    if (!post) throw new Error('Post não encontrado');

    // Validação do compartilhamento (se aplicável)
    if (shareId) {
      const share = await this.repository.findPostShareById(shareId);
      if (!share) throw new Error('Compartilhamento não encontrado');
    }

    // Criação do comentário
    await this.repository.createComment(createCommentDTO);
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

    // 👇 Passa o requestingUserId para o repository
    const { posts, totalCount } = await this.repository.findPostsByUser(
      userId,
      requestingUserId,
      page,
      limit
    );

    // 👇 CORREÇÃO: Passe requestingUserId para o DTO
    const postDTOs = posts.map(
      (post) =>
        PostListItemDTO.fromDomain(
          post,
          userExists,
          post.images,
          requestingUserId
        )
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
