import { User } from '../entities/User';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailOrPhone(emailOrPhone: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;

  // 👇 Métodos de recuperação de senha
  savePasswordResetToken(userId: number, token: string, expiresAt: Date): Promise<void>;
  findByPasswordResetToken(token: string): Promise<User | null>;
  updatePasswordAndClearResetToken(userId: number, newPasswordHash: string): Promise<void>;
}
