// src/application/use-cases/AuthUseCases.ts
import { AuthService } from "../services/AuthService";
import { LoginRequestDTO } from "../../core/dtos/LoginRequestDTO";


export class AuthUseCases {
  constructor(private authService: AuthService) {}

  async login(data: LoginRequestDTO) {
    return this.authService.login(data);
  }

  async register(data: { name: string, email: string, password: string, phone: string }) {
    return this.authService.register(data);
  }
}
