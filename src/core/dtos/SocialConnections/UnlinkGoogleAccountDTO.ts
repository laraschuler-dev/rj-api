// src/core/dtos/UnlinkGoogleAccountDTO.ts

/**
 * DTO para solicitação de desvinculação de conta Google
 */
export interface UnlinkGoogleAccountRequestDTO {
  /**
   * Senha atual para confirmação de segurança
   * @example "minhaSenha123"
   */
  password: string;
}