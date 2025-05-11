/**
 * DTO para a solicitação de login.
 * Contém os dados necessários para autenticar um usuário.
 */
export interface LoginRequestDTO {
  /**
   * E-mail ou telefone do usuário.
   */
  emailOrPhone: string;

  /**
   * Senha do usuário.
   */
  password: string;
}