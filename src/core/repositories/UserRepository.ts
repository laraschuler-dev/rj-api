// src/core/repositories/UserRepository.ts
import { User } from '../entities/User';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>; // Esse método já deve estar na interface
  findByEmailOrPhone(emailOrPhone: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
}
