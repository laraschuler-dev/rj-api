// src/core/dtos/LinkGoogleAccountDTO.ts

/**
 * DTO para solicitação de vinculação de conta Google
 */
export interface LinkGoogleAccountRequestDTO {
  /**
   * Token de autenticação do Google
   * @example "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij..."
   */
  idToken: string;
}