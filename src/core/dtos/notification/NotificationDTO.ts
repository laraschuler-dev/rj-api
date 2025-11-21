// src/core/dtos/notification/NotificationDTO.ts
export class NotificationDTO {
  constructor(
    public readonly id: number,
    public readonly type:
      | 'LIKE'
      | 'COMMENT'
      | 'EVENT_ATTENDANCE'
      | 'SHARE'
      | 'FOLLOW',
    public readonly is_read: boolean,
    public readonly created_at: string,
    public readonly actor: {
      id: number;
      name: string;
      avatar_url?: string | null;
    },
    public readonly post?: {
      id: number | null;
      share_id?: number | null;
      content_preview: string;
      image?: string;
      comment_id?: number | null;
    },
    public readonly message?: string
  ) {}
}
