import { AuthService } from '../services/AuthService';
import { LoginRequestDTO } from '../../core/dtos/LoginRequestDTO';
import { RegisterRequestDTO } from '../../core/dtos/RegisterRequestDTO';
import { ForgotPasswordRequestDTO } from '../../core/dtos/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '../../core/dtos/ResetPasswordRequestDTO';

/**
 * Casos de uso relacionados à autenticação e gerenciamento de usuários.
 * Esta classe atua como uma ponte entre os controladores e os serviços, orquestrando as operações de autenticação.
 */
export class AuthUseCases {
  /**
   * Construtor do AuthUseCases.
   * @param authService - Serviço responsável pela lógica de autenticação e gerenciamento de usuários.
   */
  constructor(private authService: AuthService) {}

  /**
   * Realiza o registro de um novo usuário.
   * @param data - Dados do usuário para registro (nome, e-mail, telefone, senha).
   * @returns Dados do usuário registrado.
   */
  async register(data: RegisterRequestDTO) {
    return this.authService.register(data);
  }

  /**
   * Realiza o login de um usuário.
   * @param data - Dados de login (e-mail ou telefone e senha).
   * @returns Token JWT e informações do usuário autenticado.
   */
  async login(data: LoginRequestDTO) {
    return this.authService.login(data);
  }

  /**
   * Solicita a recuperação de senha para um usuário.
   * @param email - E-mail do usuário que solicitou a recuperação de senha.
   * @returns Uma promessa resolvida quando o processo for concluído.
   */
  async requestPasswordReset(email: string): Promise<void> {
    await this.authService.forgotPassword({ email });
  }

  /**
   * Envia um e-mail de recuperação de senha para o usuário.
   * @param data - Dados para recuperação de senha (e-mail).
   * @returns Uma promessa resolvida quando o processo for concluído.
   */
  async forgotPassword(data: ForgotPasswordRequestDTO): Promise<void> {
    return this.authService.forgotPassword(data);
  }

  /**
   * Redefine a senha de um usuário com base em um token de recuperação.
   * @param data - Dados para redefinição de senha (token e nova senha).
   * @returns Uma promessa resolvida quando o processo for concluído.
   */
  async resetPassword(data: ResetPasswordRequestDTO): Promise<void> {
    await this.authService.resetPassword(data);
  }

  async getSessionUser(userId: number) {
    return this.authService.getAuthenticatedUser(userId);
  }
}
