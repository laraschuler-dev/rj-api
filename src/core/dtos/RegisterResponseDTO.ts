/**
 * DTO para a resposta de registro.
 * Contém os dados do usuário registrado.
 */
export interface RegisterResponseDTO {
  /**
   * ID do usuário registrado.
   */
  id: number;

  /**
   * Nome do usuário registrado.
   */
  name: string;

  /**
   * E-mail do usuário registrado.
   */
  email: string;

  /**
   * Telefone do usuário registrado (opcional).
   */
  phone: string | null;
}