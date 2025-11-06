// core/dtos/UnavailablePostDTO.ts
export class UnavailablePostDTO {
  constructor(
    public readonly uniqueKey: string,
    public readonly id: number,
    public readonly isUnavailable: boolean = true,
    public readonly reason:
      | 'ORIGINAL_POST_DELETED'
      | 'ORIGINAL_AUTHOR_DELETED',
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
      id: number;
      name: string;
      avatarUrl?: string;
    }
  ) {}

  static createForDeletedOriginal(
    shareId: number,
    sharedBy: any,
    originalAuthor?: { id: number; name: string; avatarUrl?: string }
  ): UnavailablePostDTO {
    return new UnavailablePostDTO(
      `unavailable:${shareId}`,
      shareId,
      true,
      'ORIGINAL_POST_DELETED',
      sharedBy,
      originalAuthor
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
    );
  }
}
