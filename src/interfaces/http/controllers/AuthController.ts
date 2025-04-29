// src/interfaces/http/controllers/AuthController.ts
import { Request, Response } from 'express';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';

export class AuthController {
  constructor(private authUseCases: AuthUseCases) {}

  async login(req: Request, res: Response) {
    const { emailOrPhone, password } = req.body;

    try {
      const result = await this.authUseCases.login({ emailOrPhone, password });
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async register(req: Request, res: Response) {
    const { name, email, password, phone } = req.body;

    try {
      const result = await this.authUseCases.register({
        name,
        email,
        password,
        phone,
      });
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
