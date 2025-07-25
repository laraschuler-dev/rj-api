 /**
 * Tipo que representa os metadados de um post.
 * 
 * Esse tipo contém as propriedades necessárias para representar os metadados de um post.
 */
export type PostMetadata = {
  /**
   * Título do post.
   */
  title?: string

  /**
   * Localização do post.
   */
  location?: string

  /**
   * Data do post.
   */
  date?: string

  /**
   * Tipo do post.
   */
  itemType?: string

  /**
   * Condição do post.
   */
  condition?: string

  /**
   * Disponibilidade do post.
   */
  availability?: string

  /**
   * Descrição do post.
   */
  description?: string

  /**
   * Se o post é anônimo.
   */
  isAnonymous?: boolean

  /**
   * Objetivo do post.
   */
  goal?: string

  /**
   * Prazo do post.
   */
  deadline?: string

  /**
   * Organizador do post.
   */
  organizer?: string

  /**
   * Tipo do post.
   */
  type?: string

  /**
   * Urgência do post.
   */
  urgency?: string

  /**
   * Tipo de serviço do post.
   */
  serviceType?: string

  /**
   * Qualificações do post.
   */
  qualifications?: string

  /**
   * Formato do post.
   */
  format?: string

  /**
   * Duração do post.
   */
  duration?: string

  /**
   * Requisitos do post.
   */
  requirements?: string
};

/**
 * Entidade que representa um post.
 * 
 * Essa entidade contém as propriedades e métodos necessários para representar um post.
 */
export class Post {
  images: string[];
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
    public readonly liked?: boolean
  ) {
    this.images = images;
  }

  public readonly sharedBy?: {
    userId: number;
    userName: string;
    avatarUrl?: string;
    message?: string;
    sharedAt: Date;
  };
}
