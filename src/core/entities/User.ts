/**
 * Entidade que representa um usuário no domínio da aplicação.
 * Contém os atributos e comportamentos relacionados a um usuário.
 */
export class User {
  /**
   * Data de expiração do token de recuperação de senha (opcional).
   */
  passwordResetTokenExpiresAt: any;

  /**
   * Construtor da entidade User.
   * @param id - ID do usuário.
   * @param name - Nome do usuário.
   * @param email - E-mail do usuário.
   * @param password - Senha do usuário (criptografada).
   * @param phone - Telefone do usuário (opcional).
   */
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public phone: string | null
  ) {}
}