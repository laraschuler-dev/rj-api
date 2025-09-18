import { Post } from '../entities/Post';
import { User } from '../entities/User';

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
    public readonly sharedBy?: SharedByDTO,
    public readonly eventAttendance?: EventAttendanceDTO[],
    public readonly attending?: boolean
  ) {}

  static fromDomain(post: Post, user: User, images: string[]): PostListItemDTO {
    // Verifica se é anônimo
    const isAnonymous = post.metadata?.isAnonymous === true;

    // Define o avatarUrl baseado no anonimato
    const avatarUrl = isAnonymous
      ? '/default-avatar.png' // Avatar padrão para anônimos
      : post.avatarUrl || user.avatarUrl; // Avatar normal

    const author: AuthorDTO = {
      id: isAnonymous ? 0 : user.id, // Anonimiza ID se necessário
      name: isAnonymous ? 'Usuário Anônimo' : user.name, // Anonimiza nome
      avatarUrl: avatarUrl,
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
    const attending = eventAttendance.some((a) => a.userId === user.id);

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
      sharedBy,
      eventAttendance,
      attending
    );
  }
}
