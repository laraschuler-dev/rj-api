/**
 * Tipo que representa os metadados de um post.
 *
 * Esse tipo contém as propriedades necessárias para representar os metadados de um post.
 */
export type PostMetadata = {
  /**
   * Título do post.
   */
  title?: string;

  /**
   * Localização do post.
   */
  location?: string;

  /**
   * Data do post.
   */
  date?: string;

  /**
   * Tipo do post.
   */
  itemType?: string;

  /**
   * Condição do post.
   */
  condition?: string;

  /**
   * Disponibilidade do post.
   */
  availability?: string;

  /**
   * Descrição do post.
   */
  description?: string;

  /**
   * Se o post é anônimo.
   */
  isAnonymous?: boolean;

  /**
   * Objetivo do post.
   */
  goal?: string;

  /**
   * Prazo do post.
   */
  deadline?: string;

  /**
   * Organizador do post.
   */
  organizer?: string;

  /**
   * Tipo do post.
   */
  type?: string;

  /**
   * Urgência do post.
   */
  urgency?: string;

  /**
   * Tipo de serviço do post.
   */
  serviceType?: string;

  /**
   * Qualificações do post.
   */
  qualifications?: string;

  /**
   * Formato do post.
   */
  format?: string;

  /**
   * Duração do post.
   */
  duration?: string;

  /**
   * Requisitos do post.
   */
  requirements?: string;
};

/**
 * Entidade que representa um post.
 *
 * Essa entidade contém as propriedades e métodos necessários para representar um post.
 */
export class Post {
  images: string[];
  user: any;
  /**
   * Construtor da classe Post.
   *
   * @param id - ID do post.
   * @param content - Conteúdo do post.
   * @param categoria_idcategoria - ID da categoria do post.
   * @param user_iduser - ID do usuário que criou o post.
   * @param metadata - Metadados do post.
   * @param createdAt - Data de criação do post.
   */
  constructor(
    public readonly id: number | null,
    public readonly content: string,
    public readonly categoria_idcategoria: number,
    public readonly user_iduser: number,
    public readonly metadata: PostMetadata,
    public readonly createdAt: Date = new Date(),
    images: string[] = [],
    public readonly avatarUrl?: string | null,
    public readonly liked?: boolean,
    public readonly sharedBy?: {
      shareId: number; // ID do compartilhamento (share)
      postId: number; // ID do post original
      id: number;
      name: string; // Mudar de userName para name
      avatarUrl?: string | null;
      message?: string | null;
      sharedAt: Date; // Manter como Date
    },
    public readonly eventAttendance?: { userId: number; status: string }[],
  ) {
    this.images = images;
  }

  /**
   * Identificador universal para posts em feeds combinados.
   *
   * - Posts originais: `post:{id}`
   * - Compartilhamentos: `shared:{sharerId}:{postId}:{timestamp}`
   *
   * Garante unicidade mesmo quando:
   * - O mesmo post é compartilhado múltiplas vezes
   * - Múltiplos usuários compartilham o mesmo post
   */
  getUniqueIdentifier(): string {
    if (this.sharedBy) {
      const timestamp =
        this.sharedBy.sharedAt instanceof Date
          ? this.sharedBy.sharedAt.getTime()
          : new Date(this.sharedBy.sharedAt).getTime();

      // Agora usando o shareId no lugar do postId
      return `shared:${this.sharedBy.id}:${this.sharedBy.shareId}:${timestamp}`;
    }
    return `post:${this.id}`;
  }
}
