export interface AttendEventDTO {
  userId: number;
  postId: number;
  status: 'interested' | 'confirmed';
}