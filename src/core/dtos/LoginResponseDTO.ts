/**
 * DTO para a resposta de login.
 * Contém o token JWT e as informações do usuário autenticado.
 */
export interface LoginResponseDTO {
  /**
   * Token JWT gerado para o usuário autenticado.
   */
  token: string;

  /**
   * Informações do usuário autenticado.
   */
  user: {
    /**
     * ID do usuário.
     */
    id: number;

    /**
     * Nome do usuário.
     */
    name: string;

    /**
     * E-mail do usuário.
     */
    email: string;

    /**
     * Telefone do usuário (opcional).
     */
    phone?: string | null;
    
    /**
     * Indica se o login foi realizado com uma conta social.
     */
    isSocialLogin: boolean;

    /**
     * Indica se tem conta Google vinculada
     */
    hasGoogle: boolean;
  };
}