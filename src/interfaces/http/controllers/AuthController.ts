import { Request, Response } from 'express';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';

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
}
