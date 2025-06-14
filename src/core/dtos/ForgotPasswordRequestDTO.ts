/**
 * DTO para a solicitação de recuperação de senha.
 * Contém os dados necessários para iniciar o processo de recuperação de senha.
 */
export interface ForgotPasswordRequestDTO {
  /**
   * E-mail do usuário que solicitou a recuperação de senha.
   */
  email: string;
}