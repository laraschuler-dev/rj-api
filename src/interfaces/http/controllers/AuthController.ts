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
   * @throws Erro caso o token do Google seja inválido.
   */
  async loginWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      console.log(
        '[LoginGoogle] Recebido idToken:',
        req.body.idToken?.slice(0, 10),
        '...'
      );

      const result = await this.authUseCases.loginWithGoogle(req.body.idToken);

      console.log('[LoginGoogle] Resultado gerado:', {
        userId: result.user.id,
        email: result.user.email,
        hasPhone: !!result.user.phone,
      });

      res.status(200).json(result);
    } catch (err: any) {
      console.error('[LoginGoogle] Erro:', err.message);
      res.status(400).json({ error: err.message });
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

      console.log(
        '[LinkGoogleAccount] Usuário:',
        userId,
        'Token:',
        req.body.idToken?.slice(0, 10),
        '...'
      );

      const result = await this.authUseCases.linkGoogleAccount(
        userId,
        req.body
      );

      console.log('[LinkGoogleAccount] Conta vinculada com sucesso:', {
        userId: result.user.id,
        email: result.user.email,
        hasGoogle: result.user.hasGoogle,
      });

      res.status(200).json(result);
    } catch (err: any) {
      console.error('[LinkGoogleAccount] Erro:', err.message);
      res.status(400).json({ error: err.message });
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

      console.log(
        '[UnlinkGoogleAccount] Usuário:',
        userId,
        'solicitando desvinculação'
      );

      await this.authUseCases.unlinkGoogleAccount(userId, req.body);

      console.log(
        '[UnlinkGoogleAccount] Conta desvinculada com sucesso para usuário:',
        userId
      );

      res.status(200).json({
        message: 'Conta Google desvinculada com sucesso',
        hasGoogle: false,
      });
    } catch (err: any) {
      console.error('[UnlinkGoogleAccount] Erro:', err.message);
      res.status(400).json({ error: err.message });
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

      console.log(
        '[GetSocialConnections] Buscando conexões para usuário:',
        userId
      );

      const connections = await this.authUseCases.getSocialConnections(userId);

      console.log('[GetSocialConnections] Conexões encontradas:', connections);

      res.status(200).json(connections);
    } catch (err: any) {
      console.error('[GetSocialConnections] Erro:', err.message);
      res.status(400).json({ error: err.message });
    }
  }
}
