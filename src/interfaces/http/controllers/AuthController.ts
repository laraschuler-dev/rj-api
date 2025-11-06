import { Request, Response } from 'express';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';
import { DeleteAccountDTO } from '../../../core/dtos/DeleteAccountDTO';

/**
 * Controlador responsável por lidar com as requisições relacionadas à autenticação.
 * Atua como intermediário entre as rotas e os casos de uso.
 */
export class AuthController {
  /**
   * Construtor do AuthController.
   * @param authUseCases - Instância dos casos de uso relacionados à autenticação.
   */
  constructor(private authUseCases: AuthUseCases) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.requestPasswordReset = this.requestPasswordReset.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.getSession = this.getSession.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.getSocialConnections = this.getSocialConnections.bind(this);
    this.unlinkGoogleAccount = this.unlinkGoogleAccount.bind(this);
    this.linkGoogleAccount = this.linkGoogleAccount.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.resendVerification = this.resendVerification.bind(this);
    this.getVerificationStatus = this.getVerificationStatus.bind(this);
  }

  /**
   * Lida com a criação de um novo usuário.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna o usuário criado ou um erro caso a operação falhe.
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const user = await this.authUseCases.register(data);
      res.status(201).json(user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      await this.authUseCases.verifyEmail(token);
      res.status(200).json({ message: 'E-mail verificado com sucesso!' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async resendVerification(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.authUseCases.sendNewVerificationEmail(email);
      res.status(200).json({ message: 'E-mail de verificação reenviado!' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getVerificationStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const status = await this.authUseCases.getEmailVerificationStatus(userId);
      res.status(200).json(status);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Lida com a exclusão lógica da conta do usuário.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna uma mensagem de sucesso ou um erro caso a operação falhe.
   */
  async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res
          .status(401)
          .json({ error: 'Unauthorized: user not found in request' });
        return;
      }

      const userId = req.user.id;
      const data: DeleteAccountDTO = req.body;

      await this.authUseCases.deleteAccount(userId, data);
      res.status(200).json({
        message:
          'Conta excluída com sucesso. Seus dados serão mantidos por questões de segurança e conformidade.',
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Lida com o login de um usuário.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna o token JWT e as informações do usuário autenticado ou um erro caso a operação falhe.
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { token, user } = await this.authUseCases.login(data);
      res.status(200).json({ token, user });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  /**
   * Lida com a solicitação de recuperação de senha.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna uma mensagem de sucesso ou um erro caso a operação falhe.
   */
  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.authUseCases.requestPasswordReset(email);
      res
        .status(200)
        .json({ message: 'Password reset link sent if the email exists.' });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  /**
   * Lida com a redefinição de senha.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna uma mensagem de sucesso ou um erro caso a operação falhe.
   */
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;
      await this.authUseCases.resetPassword({ token, newPassword });
      res.status(200).json({ message: 'Password reset successfully.' });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  /**
   * Retorna as informações do usuário autenticado.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna as informações do usuário autenticado ou um erro caso a operação falhe.
   */
  async getSession(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (userId === undefined) {
        res
          .status(401)
          .json({ message: 'Unauthorized: user ID not found in request' });
        return;
      }

      const user = await this.authUseCases.getSessionUser(userId);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateAccount(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res
          .status(401)
          .json({ error: 'Unauthorized: user not found in request' });
        return;
      }
      const userId = req.user.id;
      const updatedUser = await this.authUseCases.updateAccount(
        userId,
        req.body
      );
      res.json(updatedUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res
          .status(401)
          .json({ error: 'Unauthorized: user not found in request' });
        return;
      }
      const userId = req.user.id;
      await this.authUseCases.updatePassword(userId, req.body);
      res.json({ message: 'Senha atualizada com sucesso.' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  /**
   * Realiza o login de um usuário com o Google.
   * @param req - Objeto da requisição HTTP.
   * @param res - Objeto da resposta HTTP.
   * @returns Retorna o token JWT e as informações do usuário autenticado ou um erro caso a operação falhe.
   */
  async loginWithGoogle(req: Request, res: Response): Promise<void> {
    try {

      if (!req.body.idToken) {
        res.status(400).json({ error: 'Token do Google é obrigatório' });
        return;
      }

      const result = await this.authUseCases.loginWithGoogle(req.body.idToken);

      res.status(200).json(result);
    } catch (err: any) {
      console.error('[LoginGoogle] Erro:', err.message);

      // Respostas mais específicas baseadas no tipo de erro
      if (
        err.message.includes('token inválido') ||
        err.message.includes('Google token')
      ) {
        res.status(401).json({ error: 'Token do Google inválido ou expirado' });
      } else if (
        err.message.includes('excluída') ||
        err.message.includes('deletada')
      ) {
        res.status(403).json({
          error: err.message,
          code: 'ACCOUNT_DELETED',
        });
      } else if (
        err.message.includes('não encontrada') ||
        err.message.includes('não encontrado')
      ) {
        res.status(404).json({ error: err.message });
      } else {
        res.status(400).json({ error: err.message });
      }
    }
  }

  /**
   * Vincula uma conta Google a um usuário existente
   */
  async linkGoogleAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      if (!req.body.idToken) {
        res.status(400).json({ error: 'Token do Google é obrigatório' });
        return;
      }

      const result = await this.authUseCases.linkGoogleAccount(
        userId,
        req.body
      );

      res.status(200).json({
        ...result,
        message: 'Conta Google vinculada com sucesso',
      });
    } catch (err: any) {
      console.error('[LinkGoogleAccount] Erro:', err.message);

      // Respostas específicas para diferentes cenários
      if (
        err.message.includes('não autenticado') ||
        err.message.includes('não encontrado')
      ) {
        res.status(401).json({ error: err.message });
      } else if (err.message.includes('Token Google inválido')) {
        res.status(401).json({ error: 'Token do Google inválido' });
      } else if (err.message.includes('já está vinculada')) {
        res.status(409).json({
          error: err.message,
          code: 'ALREADY_LINKED',
        });
      } else if (err.message.includes('vinculada a outra conta')) {
        res.status(409).json({
          error: err.message,
          code: 'GOOGLE_ALREADY_LINKED',
        });
      } else if (err.message.includes('email deve ser o mesmo')) {
        res.status(400).json({
          error: err.message,
          code: 'EMAIL_MISMATCH',
        });
      } else if (err.message.includes('excluída')) {
        res.status(403).json({
          error: err.message,
          code: 'ACCOUNT_DELETED',
        });
      } else {
        res.status(400).json({ error: err.message });
      }
    }
  }

  /**
   * Desvincula a conta Google de um usuário
   */
  async unlinkGoogleAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      if (!req.body.password) {
        res.status(400).json({ error: 'Senha é obrigatória para desvincular' });
        return;
      }

      await this.authUseCases.unlinkGoogleAccount(userId, req.body);

      res.status(200).json({
        message: 'Conta Google desvinculada com sucesso',
        hasGoogle: false,
      });
    } catch (err: any) {
      console.error('[UnlinkGoogleAccount] Erro:', err.message);

      // Tratamento específico de erros
      if (
        err.message.includes('não autenticado') ||
        err.message.includes('não encontrado')
      ) {
        res.status(401).json({ error: err.message });
      } else if (err.message.includes('Senha incorreta')) {
        res.status(401).json({
          error: err.message,
          code: 'INVALID_PASSWORD',
        });
      } else if (err.message.includes('não está vinculada')) {
        res.status(404).json({
          error: err.message,
          code: 'NOT_LINKED',
        });
      } else if (err.message.includes('criar uma senha')) {
        res.status(400).json({
          error: err.message,
          code: 'NO_PASSWORD_SET',
        });
      } else if (err.message.includes('excluída')) {
        res.status(403).json({
          error: err.message,
          code: 'ACCOUNT_DELETED',
        });
      } else {
        res.status(400).json({ error: err.message });
      }
    }
  }

  /**
   * Obtém as conexões sociais do usuário
   */
  async getSocialConnections(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }


      const connections = await this.authUseCases.getSocialConnections(userId);


      res.status(200).json(connections);
    } catch (err: any) {
      console.error('[GetSocialConnections] Erro:', err.message);

      // Tratamento específico para obtenção de conexões
      if (
        err.message.includes('não autenticado') ||
        err.message.includes('não encontrado')
      ) {
        res.status(401).json({ error: err.message });
      } else if (err.message.includes('excluída')) {
        res.status(403).json({
          error: err.message,
          code: 'ACCOUNT_DELETED',
        });
      } else {
        res.status(400).json({ error: err.message });
      }
    }
  }
}
