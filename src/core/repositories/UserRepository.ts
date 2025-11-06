import { User } from '../entities/User';

/**
 * Interface para o repositório de usuários.
 * Define os métodos necessários para manipular os dados de usuários no banco de dados.
 */
export interface UserRepository {
  /**
   * Cria um novo usuário no banco de dados.
   * @param user - Dados do usuário a ser criado.
   * @returns O usuário criado.
   */
  create(user: User): Promise<User>;

  /**
   * Busca um usuário pelo e-mail.
   * @param email - E-mail do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Busca um usuário pelo e-mail ou telefone.
   * @param emailOrPhone - E-mail ou telefone do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  findByEmailOrPhone(emailOrPhone: string): Promise<User | null>;

  /**
   * Busca um usuário pelo ID.
   * @param id - ID do usuário.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  findByIdUser(id: number): Promise<User | null>;

  /**
   * Salva o token de recuperação de senha para um usuário.
   * @param userId - ID do usuário.
   * @param token - Token de recuperação de senha.
   * @param expiresAt - Data de expiração do token.
   * @returns Uma promessa resolvida quando o token for salvo.
   */
  savePasswordResetToken(
    userId: number,
    token: string,
    expiresAt: Date
  ): Promise<void>;

  /**
   * Busca um usuário pelo token de recuperação de senha.
   * @param token - Token de recuperação de senha.
   * @returns O usuário encontrado ou `null` se não existir.
   */
  findByPasswordResetToken(token: string): Promise<User | null>;

  /**
   * Atualiza a senha de um usuário e remove o token de recuperação.
   * @param userId - ID do usuário.
   * @param newPasswordHash - Nova senha criptografada.
   * @returns Uma promessa resolvida quando a operação for concluída.
   */
  updatePasswordAndClearResetToken(
    userId: number,
    newPasswordHash: string
  ): Promise<void>;

  updateUserData(
    userId: number,
    data: { name?: string; email?: string; phone?: string | null }
  ): Promise<User>;

  updatePassword(userId: number, newPasswordHash: string): Promise<void>;

  searchUsers(
    searchTerm: string,
    page: number,
    limit: number
  ): Promise<{
    users: Array<{
      id: number;
      name: string;
      email: string;
      avatarUrl?: string;
      profileType?: string;
    }>;
    totalCount: number;
  }>;

  /**
   * Realiza a exclusão lógica de uma conta de usuário.
   * @param userId - ID do usuário.
   * @param reason - Motivo opcional para exclusão.
   * @returns Uma promessa resolvida quando a operação for concluída.
   */
  softDeleteUser(userId: number): Promise<void>;

  /**
   * Verifica se um usuário está marcado como excluído.
   * @param userId - ID do usuário.
   * @returns `true` se o usuário estiver excluído, caso contrário `false`.
   */
  isUserDeleted(userId: number): Promise<boolean>;

  /**
   * Verifica se um usuário existe no banco de dados.
   * @param userId - ID do usuário.
   * @returns `true` se o usuário existir, caso contrário `false`.
   */
}
