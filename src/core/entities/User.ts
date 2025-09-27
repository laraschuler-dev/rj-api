export class User {
  /**
   * Data de expiração do token de recuperação de senha (opcional).
   */
  passwordResetTokenExpiresAt?: Date | null;
  avatarUrl: string | undefined;
  fone: any;
  iduser: any;

  /**
   * Construtor da entidade User.
   * @param id - ID do usuário.
   * @param name - Nome do usuário.
   * @param email - E-mail do usuário.
   * @param password - Senha do usuário (criptografada).
   * @param phone - Telefone do usuário (opcional).
   * @param passwordResetToken - Token de reset de senha (opcional).
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phone: string | null,
    public readonly passwordResetToken?: string,
    passwordResetTokenExpiresAt?: Date | null
  ) {
    this.passwordResetTokenExpiresAt = passwordResetTokenExpiresAt;
  }
}
