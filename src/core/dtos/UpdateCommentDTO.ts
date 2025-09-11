export interface UpdateCommentDTO {
  postId: number;
  postShareId?: number;
  commentId: number;
  userId: number;
  content: string;
}
