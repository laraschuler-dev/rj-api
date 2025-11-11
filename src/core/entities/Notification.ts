// src/core/entities/Notification.ts
export type NotificationType =
  | 'LIKE'
  | 'COMMENT'
  | 'EVENT_ATTENDANCE'
  | 'SHARE'
  | 'FOLLOW';

export class Notification {
  constructor(
    public readonly id: number | null,
    public readonly user_id: number,
    public readonly actor_id: number,
    public readonly type: NotificationType,
    public readonly post_id: number | null,
    public readonly post_share_id: number | null,
    public readonly comment_id: number | null,
    public readonly is_read: boolean,
    public readonly created_at: Date
  ) {}
}
