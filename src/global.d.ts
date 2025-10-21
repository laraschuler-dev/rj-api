/**
 * Declarações globais do tipo.
 * 
 * Esse arquivo contém declarações de tipos globais que podem ser usadas em todo o projeto.
 */

// Extensão direta do Express (sem import/export)
declare namespace Express {
  /**
   * Tipo de requisição do Express com informações de autenticação e arquivos.
   */
  export interface Request {
    /**
     * Informações de autenticação do usuário.
     */
    user?: { id: number };

    /**
     * Arquivos enviados com a requisição.
     */
    files?: Express.Multer.File[];
  }
}