// src/application/use-cases/AuthUseCases.ts
import { AuthService } from '../services/AuthService';
import { LoginRequestDTO } from '../../core/dtos/LoginRequestDTO';
import { RegisterRequestDTO } from '../../core/dtos/RegisterRequestDTO';
import { ForgotPasswordRequestDTO } from '../../core/dtos/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '../../core/dtos/ResetPasswordRequestDTO';

export class AuthUseCases {
  async requestPasswordReset(email: string): Promise<void> {
    await this.authService.forgotPassword({ email });
  }
  constructor(private authService: AuthService) {}

  async login(data: LoginRequestDTO) {
    return this.authService.login(data);
  }

  async register(data: RegisterRequestDTO) {
    return this.authService.register(data);
  }

  async forgotPassword(data: ForgotPasswordRequestDTO): Promise<void> {
    return this.authService.forgotPassword(data);
  }

  async resetPassword(data: ResetPasswordRequestDTO): Promise<void> {
    await this.authService.resetPassword(data);
  }
}
