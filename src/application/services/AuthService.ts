import { UserRepository } from '../../core/repositories/UserRepository';
import { User } from '../../core/entities/User';
import { RegisterRequestDTO } from '../../core/dtos/RegisterRequestDTO';
import { LoginRequestDTO } from '../../core/dtos/LoginRequestDTO';
import { ForgotPasswordRequestDTO } from '../../core/dtos/ForgotPasswordRequestDTO';
import { ResetPasswordRequestDTO } from '../../core/dtos/ResetPasswordRequestDTO';
import { PasswordRecoveryService } from './PasswordRecoveryService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { LoginResponseDTO } from '../../core/dtos/LoginResponseDTO';
import { RegisterResponseDTO } from '../../core/dtos/RegisterResponseDTO';

export class AuthService {
  private jwtSecret: string;

  constructor(
    private userRepository: UserRepository,
    private passwordRecoveryService: PasswordRecoveryService, // Adicione este argumento
    jwtSecret: string
  ) {
    this.jwtSecret = jwtSecret;
  }

  async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    if (!validator.isEmail(data.email)) {
      throw new Error('Email inválido');
    }

    const cleanedPhone = data.phone.replace(/\D/g, '');
    const phoneRegex = /^\d{2}\d{8,9}$/; // 2 dígitos para o DDD + 8 ou 9 dígitos para o número
    if (!phoneRegex.test(cleanedPhone)) {
      throw new Error(
        'Telefone inválido. Deve conter o DDD seguido de 8 ou 9 dígitos.'
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      throw new Error(
        'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.'
      );
    }

    const [existingEmail, existingPhone] = await Promise.all([
      this.userRepository.findByEmailOrPhone(data.email),
      this.userRepository.findByEmailOrPhone(cleanedPhone),
    ]);

    if (existingEmail) {
      throw new Error('Já existe um usuário com este e-mail cadastrado.');
    }
    if (existingPhone) {
      throw new Error('Já existe um usuário com este telefone cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User(
      0,
      data.name,
      data.email,
      hashedPassword,
      cleanedPhone
    );
    const createdUser = await this.userRepository.create(newUser);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
    };
  }

  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { emailOrPhone, password } = data;
    const sanitizedInput = emailOrPhone.trim().replace(/\D/g, '');

    const user =
      (await this.userRepository.findByEmailOrPhone(emailOrPhone)) ||
      (await this.userRepository.findByEmailOrPhone(sanitizedInput));

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await this.verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    };
  }

  async forgotPassword(data: ForgotPasswordRequestDTO): Promise<void> {
    // Delegar a lógica para o PasswordRecoveryService
    await this.passwordRecoveryService.sendRecoveryEmail(data.email);
  }

  async resetPassword(data: ResetPasswordRequestDTO): Promise<void> {
    // Delegar a lógica para o PasswordRecoveryService
    await this.passwordRecoveryService.resetPassword(data);
  }

  private async verifyPassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }
}
