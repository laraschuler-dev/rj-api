/**
 * DTO para a solicitação de redefinição de senha.
 * Contém os dados necessários para redefinir a senha de um usuário.
 */
export interface ResetPasswordRequestDTO {
  /**
   * Token de recuperação de senha.
   */
  token: string;

  /**
   * Nova senha do usuário.
   */
  newPassword: string;
}