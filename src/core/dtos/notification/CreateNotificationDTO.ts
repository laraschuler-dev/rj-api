// src/core/dtos/notification/CreateNotificationDTO.ts
export interface CreateNotificationDTO {
  user_id: number;
  actor_id: number;
  type: 'LIKE' | 'COMMENT' | 'EVENT_ATTENDANCE' | 'SHARE';
  post_id: number;
  post_share_id?: number | null;
  comment_id?: number | null;
}
