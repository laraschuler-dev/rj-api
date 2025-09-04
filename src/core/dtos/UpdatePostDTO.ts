export interface UpdatePostDTO {
  postId?: number;
  shareId?: number;
  userId: number;
  content?: string;
  message?: string;
  metadata?: Record<string, any>;
  newImages?: string[]; 
}
