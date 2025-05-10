import { Request, Response } from 'express';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';

export class AuthController {
  constructor(private authUseCases: AuthUseCases) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const user = await this.authUseCases.register(data);
      res.status(201).json(user); // Manipula o objeto Response diretamente
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { token, user } = await this.authUseCases.login(data);
      res.status(200).json({ token, user }); // Manipula o objeto Response diretamente
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.authUseCases.requestPasswordReset(email);
      res.status(200).json({ message: 'Password reset link sent if the email exists.' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;
      await this.authUseCases.resetPassword({ token, newPassword });
      res.status(200).json({ message: 'Password reset successfully.' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }
}