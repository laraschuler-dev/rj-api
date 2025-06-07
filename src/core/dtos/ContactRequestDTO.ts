/**
 * Data Transfer Object (DTO) para requisições de contato.
 * 
 * Essa interface define a estrutura dos dados que devem ser enviados
 * quando um usuário faz uma requisição de contato.
 */
export interface ContactRequestDTO {
  /**
   * Nome do usuário que está fazendo a requisição de contato.
   */
  name: string;

  /**
   * Endereço de e-mail do usuário que está fazendo a requisição de contato.
   */
  email: string;

  /**
   * Mensagem que o usuário está enviando com a requisição de contato.
   */
  message: string;
}