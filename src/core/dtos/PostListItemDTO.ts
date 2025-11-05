import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { UnavailablePostDTO } from './UnavailablePostDTO';

// Subtipos auxiliares para clareza
export interface AuthorDTO {
  id: number;
  name: string;
  avatarUrl?: string;
}

export interface SharedByDTO {
  shareId: number;
  postId: number;
  id: number;
  name: string;
  avatarUrl?: string;
  message?: string;
  sharedAt: string;
}

export interface EventAttendanceDTO {
  userId: number;
  status: string; // ou event_attendance_status se quiser tipar melhor
}

export class PostListItemDTO {
  constructor(
    public readonly uniqueKey: string,
    public readonly id: number,
    public readonly content: string,
    public readonly categoria_idcategoria: number,
    public readonly user: AuthorDTO,
    public readonly metadata: any,
    public readonly images: string[],
    public readonly createdAt: string,
    public readonly liked: boolean,
    public readonly isPostOwner: boolean,
    public readonly isShareOwner: boolean,
    public readonly sharedBy?: SharedByDTO,
    public readonly eventAttendance?: EventAttendanceDTO[],
    public readonly attending?: boolean
  ) {}

  static fromDomain(
    post: Post,
    user: User,
    images: string[],
    requestingUserId?: number
  ): PostListItemDTO {
    const metadata =
      typeof post.metadata === 'string'
        ? JSON.parse(post.metadata)
        : post.metadata;

    const isAnonymous = metadata?.isAnonymous === true;
    const isPostOwner = post.user_iduser === requestingUserId;
    const isShareOwner = post.sharedBy?.id === requestingUserId || false;

    const shouldAnonymize = isAnonymous;

    // 👇 só mexemos aqui
    const avatarUrl = shouldAnonymize
      ? '/default-avatar.png'
      : post.avatarUrl || user.avatarUrl;

    const author: AuthorDTO = {
      id: shouldAnonymize ? 0 : user.id,
      name: shouldAnonymize ? 'Usuário Anônimo' : user.name,
      avatarUrl,
    };

    const sharedBy: SharedByDTO | undefined = post.sharedBy
      ? {
          shareId: post.sharedBy.shareId,
          postId: post.sharedBy.postId,
          id: post.sharedBy.id,
          name: post.sharedBy.name,
          avatarUrl: post.sharedBy.avatarUrl || undefined,
          message: post.sharedBy.message ?? undefined,
          sharedAt: post.sharedBy.sharedAt.toISOString(),
        }
      : undefined;

    const eventAttendance = post.eventAttendance || [];
    const attending = eventAttendance.some(
      (a) => a.userId === requestingUserId
    );

    return new PostListItemDTO(
      post.getUniqueIdentifier(),
      post.sharedBy ? post.sharedBy.postId : post.id!,
      post.content,
      post.categoria_idcategoria,
      author,
      post.metadata,
      images,
      post.createdAt.toISOString(),
      post.liked || false,
      isPostOwner,
      isShareOwner,
      sharedBy,
      eventAttendance,
      attending
    );
  }

  static createUnavailablePost(
    unavailableDTO: UnavailablePostDTO,
    requestingUserId?: number
  ): PostListItemDTO {
    const isShareOwner = unavailableDTO.sharedBy?.id === requestingUserId;

    // 👇 LÓGICA CORRIGIDA: Mostra autor original quando disponível
    const showOriginalAuthor =
      unavailableDTO.reason === 'ORIGINAL_POST_DELETED' &&
      unavailableDTO.originalAuthor;

    const author: AuthorDTO = showOriginalAuthor
      ? {
          id: unavailableDTO.originalAuthor.id,
          name: unavailableDTO.originalAuthor.name,
          avatarUrl: unavailableDTO.originalAuthor.avatarUrl,
        }
      : unavailableDTO.reason === 'ORIGINAL_AUTHOR_DELETED'
        ? {
            id: 0,
            name: 'Usuário Removido',
            avatarUrl: '/default-avatar.png',
          }
        : {
            id: 0,
            name: 'Autor Desconhecido',
            avatarUrl: '/default-avatar.png',
          };

    return new PostListItemDTO(
      unavailableDTO.uniqueKey,
      unavailableDTO.id,
      'Conteúdo indisponível',
      0,
      author, // 👈 AGORA mostra o autor ORIGINAL correto
      {
        isUnavailable: true,
        reason: unavailableDTO.reason,
        originalPostDeleted: unavailableDTO.reason === 'ORIGINAL_POST_DELETED',
        originalAuthorDeleted:
          unavailableDTO.reason === 'ORIGINAL_AUTHOR_DELETED',
      },
      [],
      unavailableDTO.sharedBy?.sharedAt || new Date().toISOString(),
      false,
      false,
      isShareOwner,
      unavailableDTO.sharedBy,
      [],
      false
    );
  }
}
