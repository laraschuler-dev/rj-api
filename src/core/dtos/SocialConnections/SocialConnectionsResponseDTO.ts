// src/core/dtos/SocialConnectionsResponseDTO.ts

/**
 * DTO com informações das conexões sociais do usuário
 */
export interface SocialConnectionsResponseDTO {
  /**
   * Indica se tem Google vinculado
   */
  hasGoogle: boolean;
  
  /**
   * Lista de providers vinculados
   */
  connectedProviders: string[];
}