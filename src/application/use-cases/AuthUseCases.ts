import { AuthService } from '../services/AuthService';
import { LoginRequestDTO } from '../../core/dtos/LoginRequestDTO';
import { RegisterRequestDTO } from '../../core/dtos/RegisterRequestDTO';
import { ForgotPasswordRequestDTO } from '../../core/dtos/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '../../core/dtos/ResetPasswordRequestDTO';
import { UpdatePasswordDTO } from '../../core/dtos/UpdatePasswordDTO';
import { UpdateAccountDTO } from '../../core/dtos/UpdateAccountDTO';
import { DeleteAccountDTO } from '../../core/dtos/DeleteAccountDTO';
import { UnlinkGoogleAccountRequestDTO } from '../../core/dtos/SocialConnections/UnlinkGoogleAccountDTO';
import { LinkGoogleAccountRequestDTO } from '../../core/dtos/SocialConnections/LinkGoogleAccountDTO';

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
   * Verifica um e-mail com base em um token de verificação.
   * @param token - Token de verificação.
   * @throws Erro caso o token seja inválido ou expirado.
   */
  async verifyEmail(token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }

  /**
   * Envia um novo e-mail de verificação para o usuário.
   * @param email - E-mail do usuário para quem o e-mail será enviado.
   * @returns Nenhum valor é retornado.
   * @throws Erro caso o e-mail seja inválido ou o serviço de e-mail esteja indisponível.
   */
  async sendNewVerificationEmail(email: string): Promise<void> {
    await this.authService.sendNewVerificationEmail(email);
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

  async updateAccount(userId: number, data: UpdateAccountDTO) {
    return this.authService.updateAccount(userId, data);
  }

  async updatePassword(userId: number, data: UpdatePasswordDTO) {
    return this.authService.updatePassword(userId, data);
  }

  /**
   * Realiza a exclusão lógica da conta do usuário.
   * @param userId - ID do usuário.
   * @param data - Dados para confirmação da exclusão.
   * @returns Uma promessa resolvida quando a operação for concluída.
   */
  async deleteAccount(userId: number, data: DeleteAccountDTO): Promise<void> {
    return this.authService.deleteAccount(userId, data);
  }

   /**
   * Realiza o login de um usuário com o Google.
   * @param idToken - Token de autenticação do Google.
   * @returns Token JWT e informações do usuário autenticado.
   */
  async loginWithGoogle(idToken: string) {
    return this.authService.loginWithGoogle(idToken);
  }

  /**
   * Vincula uma conta Google a um usuário existente
   * @param userId - ID do usuário autenticado
   * @param data - Dados contendo o token do Google
   * @returns Token JWT e informações atualizadas do usuário
   */
  async linkGoogleAccount(userId: number, data: LinkGoogleAccountRequestDTO) {
    if (!data.idToken) {
      throw new Error('Token do Google é obrigatório');
    }

    return await this.authService.linkGoogleAccount(userId, data.idToken);
  }

  /**
   * Desvincula a conta Google de um usuário
   * @param userId - ID do usuário autenticado
   * @param data - Dados contendo a senha para confirmação
   * @throws Erro caso a senha esteja incorreta ou não tenha Google vinculado
   */
  async unlinkGoogleAccount(userId: number, data: UnlinkGoogleAccountRequestDTO): Promise<void> {
    if (!data.password) {
      throw new Error('Senha é obrigatória para desvincular o Google');
    }

    return await this.authService.unlinkGoogleAccount(userId, data.password);
  }

  /**
   * Obtém as conexões sociais do usuário
   * @param userId - ID do usuário autenticado
   * @returns Objeto com informações das conexões sociais
   */
  async getSocialConnections(userId: number) {
    const user = await this.authService.getAuthenticatedUser(userId);
    
    const connectedProviders: string[] = [];
    if (user.hasGoogle) {
      connectedProviders.push('google');
    }

    return {
      hasGoogle: user.hasGoogle || false,
      connectedProviders,
    };
  }
}
