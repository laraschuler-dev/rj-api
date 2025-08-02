export interface CreateCommentDTO {
  userId: number;
  postId: number;
  shareId?: number | null;
  comment: string;
}
