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
  // ContentValidationService.ts - adicione logs para ver o que está acontecendo
  // ContentValidationService.ts - método validateSharedPost (VERSÃO CORRIGIDA)
  async validateSharedPost(post: Post): Promise<Post | UnavailablePostDTO> {
    if (!post.sharedBy) {
      return post;
    }

    console.log(
      `🔍 Validando compartilhamento ${post.sharedBy.shareId} do post ${post.sharedBy.postId}`
    );

    try {
      // PRIMEIRO: Busca informações do autor original (mesmo se post deletado)
      const originalAuthorInfo = await this.getOriginalAuthorInfo(
        post.sharedBy.postId
      );

      console.log(`👤 Informações do autor original:`, originalAuthorInfo);

      // SEGUNDO: Verifica se o AUTOR está deletado
      if (originalAuthorInfo) {
        const isAuthorDeleted = await this.userRepository.isUserDeleted(
          originalAuthorInfo.id
        );
        console.log(
          `❓ Autor ${originalAuthorInfo.id} está deletado:`,
          isAuthorDeleted
        );

        if (isAuthorDeleted) {
          console.log(
            `🚫 Autor ${originalAuthorInfo.id} DELETADO - marcando como ORIGINAL_AUTHOR_DELETED`
          );
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
      console.log(
        `📝 Post original ${post.sharedBy.postId} encontrado:`,
        !!originalPost
      );

      if (!originalPost) {
        console.log(
          `🚫 Post original ${post.sharedBy.postId} NÃO encontrado - marcando como ORIGINAL_POST_DELETED`
        );
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

      console.log(`✅ Post compartilhado ${post.sharedBy.shareId} válido`);
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
  
  // 👈 ADICIONE ESTE MÉTODO NO ContentValidationService
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
