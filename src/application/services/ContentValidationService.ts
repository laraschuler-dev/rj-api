// application/services/ContentValidationService.ts
import { Post } from '../../core/entities/Post';
import { UnavailablePostDTO } from '../../core/dtos/UnavailablePostDTO';
import { UserRepository } from '../../core/repositories/UserRepository';
import { PostRepository } from '../../core/repositories/PostRepository';
import { prisma } from '../../infrastructure/database/prisma/prisma';
export class ContentValidationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository
  ) {}

  /**
   * Valida se um post compartilhado ainda está disponível
   * Retorna o post original se disponível, ou DTO de indisponível se não
   */
  async validateSharedPost(post: Post): Promise<Post | UnavailablePostDTO> {
    if (!post.sharedBy) {
      return post;
    }

    try {
      // PRIMEIRO: Busca informações do autor original (mesmo se post deletado)
      const originalAuthorInfo = await this.getOriginalAuthorInfo(
        post.sharedBy.postId
      );

      if (originalAuthorInfo) {
        const isAuthorDeleted = await this.userRepository.isUserDeleted(
          originalAuthorInfo.id
        );

        if (isAuthorDeleted) {
          return UnavailablePostDTO.createForDeletedAuthor(
            post.sharedBy.shareId,
            {
              shareId: post.sharedBy.shareId,
              postId: post.sharedBy.postId,
              id: post.sharedBy.id,
              name: post.sharedBy.name,
              avatarUrl: post.sharedBy.avatarUrl,
              message: post.sharedBy.message,
              sharedAt: post.sharedBy.sharedAt.toISOString(),
            }
          );
        }
      }

      // TERCEIRO: Se autor não está deletado, verifica se o POST existe
      const originalPost = await this.postRepository.findById(
        post.sharedBy.postId
      );

      if (!originalPost) {
        return UnavailablePostDTO.createForDeletedOriginal(
          post.sharedBy.shareId,
          {
            shareId: post.sharedBy.shareId,
            postId: post.sharedBy.postId,
            id: post.sharedBy.id,
            name: post.sharedBy.name,
            avatarUrl: post.sharedBy.avatarUrl,
            message: post.sharedBy.message,
            sharedAt: post.sharedBy.sharedAt.toISOString(),
          },
          originalAuthorInfo // Passa autor original (que sabemos que não está deletado)
        );
      }

      return post;
    } catch (error) {
      console.warn(
        `❌ Erro ao validar post compartilhado ${post.sharedBy?.shareId}:`,
        error
      );
      return UnavailablePostDTO.createForDeletedOriginal(
        post.sharedBy?.shareId || 0,
        {
          shareId: post.sharedBy?.shareId || 0,
          postId: post.sharedBy?.postId || 0,
          id: post.sharedBy?.id || 0,
          name: post.sharedBy?.name || 'Usuário',
          avatarUrl: post.sharedBy?.avatarUrl,
          message: post.sharedBy?.message,
          sharedAt:
            post.sharedBy?.sharedAt.toISOString() || new Date().toISOString(),
        }
      );
    }
  }

  private async getOriginalAuthorInfo(
    postId: number
  ): Promise<{ id: number; name: string; avatarUrl?: string } | undefined> {
    try {
      // Busca o post mesmo deletado para pegar informações do autor
      const postWithAuthor = await prisma.post.findFirst({
        where: { idpost: postId },
        include: {
          user: {
            include: {
              user_profile: true,
            },
          },
        },
      });

      if (postWithAuthor?.user) {
        return {
          id: postWithAuthor.user.iduser,
          name: postWithAuthor.user.name,
          avatarUrl:
            postWithAuthor.user.user_profile?.profile_photo || undefined,
        };
      }
    } catch (error) {
      console.warn('Erro ao buscar autor original:', error);
    }
    return undefined;
  }

  /**
   * Valida uma lista de posts, substituindo os indisponíveis
   */
  async validatePosts(posts: Post[]): Promise<(Post | UnavailablePostDTO)[]> {
    const validatedPosts = await Promise.all(
      posts.map((post) => this.validateSharedPost(post))
    );

    return validatedPosts;
  }
}
