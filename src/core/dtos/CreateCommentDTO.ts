export interface CreateCommentDTO {
  postId: number;
  comment: string;
  userId: number;
  time?: Date;
}