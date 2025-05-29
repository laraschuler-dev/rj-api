import { Post } from "../entities/Post";

export interface PostRepository {
  save(post: Post): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  // Adicione outros métodos conforme necessidade
}