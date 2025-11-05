// core/dtos/UnavailablePostDTO.ts
export class UnavailablePostDTO {
  constructor(
    public readonly uniqueKey: string,
    public readonly id: number,
    public readonly isUnavailable: boolean = true,
    public readonly reason:
      | 'ORIGINAL_POST_DELETED'
      | 'ORIGINAL_AUTHOR_DELETED'
      | 'SHARE_DELETED',
    public readonly sharedBy?: {
      shareId: number;
      postId: number;
      id: number;
      name: string;
      avatarUrl?: string;
      message?: string;
      sharedAt: string;
    },
    public readonly originalAuthor?: {
      // 👈 NOVO: informações do autor original
      id: number;
      name: string;
      avatarUrl?: string;
    }
  ) {}

  static createForDeletedOriginal(
    shareId: number,
    sharedBy: any,
    originalAuthor?: { id: number; name: string; avatarUrl?: string } // 👈 NOVO parâmetro
  ): UnavailablePostDTO {
    return new UnavailablePostDTO(
      `unavailable:${shareId}`,
      shareId,
      true,
      'ORIGINAL_POST_DELETED',
      sharedBy,
      originalAuthor // 👈 Passa autor original
    );
  }

  static createForDeletedAuthor(
    shareId: number,
    sharedBy: any
  ): UnavailablePostDTO {
    return new UnavailablePostDTO(
      `unavailable:${shareId}`,
      shareId,
      true,
      'ORIGINAL_AUTHOR_DELETED',
      sharedBy
      // 👈 Não passa originalAuthor porque o autor foi deletado
    );
  }
}
