/**
 * DTO para a solicitação de registro.
 * Contém os dados necessários para registrar um novo usuário.
 */
export interface RegisterRequestDTO {
  /**
   * Nome do usuário.
   */
  name: string;

  /**
   * E-mail do usuário.
   */
  email: string;

  /**
   * Senha do usuário.
   */
  password: string;

  /**
   * Telefone do usuário.
   */
  phone: string;
}