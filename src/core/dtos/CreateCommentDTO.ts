export interface CreateCommentDTO {
  /**
   * ID do alvo (post original ou compartilhamento)
   */
  targetId: number;

  /**
   * Tipo do alvo: 'post' ou 'share'
   */
  targetType: 'post' | 'share';

  /**
   * Conteúdo do comentário
   */
  comment: string;

  userId: number;
  time?: Date;
}
