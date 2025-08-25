export interface AttendEventDTO {
  userId: number;
  postId: number;
  status: 'confirmed';
  postShareId?: number | null;
}