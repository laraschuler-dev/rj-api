export interface UpdatePostDTO {
  postId: number;
  userId: number;
  content?: string;
  metadata?: Record<string, any>;
  images?: string[]; // ✅ necessário para atualização
}
