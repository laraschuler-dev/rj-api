import { Post } from "../entities/Post";
/**
 * Interface para o repositório de posts.
 * 
 * Essa interface define os métodos necessários para gerenciar posts.
 */
export interface PostRepository {
  /**
   * Método para salvar um post.
   * 
   * @param post - Post a ser salvo.
   * @returns O post salvo.
   */
  save(post: Post): Promise<Post>;
  /**
   * Método para buscar um post por ID.
   * 
   * @param id - ID do post a ser buscado.
   * @returns O post encontrado, ou null se não for encontrado.
   */
  findById(id: number): Promise<Post | null>;
}