import { AuthorDTO, EventAttendanceDTO } from './PostListItemDTO';

export class CreatedPostDTO {
  constructor(
    public readonly uniqueKey: string,
    public readonly id: number,
    public readonly content: string,
    public readonly categoria_idcategoria: number,
    public readonly user: AuthorDTO,
    public readonly metadata: any,
    public readonly images: string[],
    public readonly createdAt: string,
    public readonly liked: boolean = false,
    public readonly isPostOwner: boolean = true, // 👈 NOVO - sempre true na criação
    public readonly isShareOwner: boolean = false, // 👈 NOVO - sempre false
    public readonly eventAttendance?: EventAttendanceDTO[],
    public readonly attending?: boolean
  ) {}

  static fromDomain(
    post: any,
    author: AuthorDTO,
    images: string[],
    requestingUserId?: number // 👈 Novo parâmetro
  ): CreatedPostDTO {
    const metadata =
      typeof post.metadata === 'string'
        ? JSON.parse(post.metadata)
        : post.metadata;

    const isAnonymous = metadata?.isAnonymous === true;

    // Aplica anonimização se necessário
    const authorToUse = isAnonymous
      ? {
          id: 0,
          name: 'Usuário Anônimo',
          avatarUrl: '/default-avatar.png',
        }
      : author;

    const eventAttendance = post.eventAttendance || [];
    const attending = eventAttendance.some(
      (a: EventAttendanceDTO) => a.userId === authorToUse.id
    );

    return new CreatedPostDTO(
      post.getUniqueIdentifier(),
      post.id!,
      post.content,
      post.categoria_idcategoria,
      authorToUse,
      post.metadata,
      images,
      post.createdAt.toISOString(),
      post.liked || false,
      true, // 👈 isPostOwner - sempre true na criação
      false, // 👈 isShareOwner - sempre false
      eventAttendance,
      attending
    );
  }
}
