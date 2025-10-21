/**
 * DTO para a solicitação de exclusão de conta.
 * Contém os dados necessários para excluir (logicamente) a conta do usuário.
 */
export interface DeleteAccountDTO {
  /**
   * Senha atual do usuário para confirmação.
   */
  password: string;

}