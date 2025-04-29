import { UserRepository } from '../../core/repositories/UserRepository';
import { User } from '../../core/entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export class AuthService {
  private jwtSecret: string;

  constructor(
    private userRepository: UserRepository,
    jwtSecret: string
  ) {
    this.jwtSecret = jwtSecret;
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<Omit<User, 'password'>> {
    // Validação de email
    if (!validator.isEmail(data.email)) {
      throw new Error('Email inválido');
    }

    // Limpa o telefone (remove máscara, espaços etc.)
    const cleanedPhone = data.phone.replace(/\D/g, '');

    // Validação de telefone
    if (!/^\d{10,11}$/.test(cleanedPhone)) {
      throw new Error('Telefone inválido. Deve conter entre 10 e 11 dígitos.');
    }

    // Validação de senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      throw new Error(
        'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.'
      );
    }

    // Verifica se email ou telefone já estão cadastrados
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
    const newUser = new User(0, data.name, data.email, hashedPassword, cleanedPhone);
    const createdUser = await this.userRepository.create(newUser);

    // Retorna o usuário sem a senha
    const { password, ...safeUser } = createdUser;
    return safeUser;
  }

  async login({
    emailOrPhone,
    password,
  }: {
    emailOrPhone: string;
    password: string;
  }): Promise<{ token: string; user: Omit<User, 'password'> }> {
    // Remove espaços e símbolos do telefone se for o caso
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
    const { password: _, ...safeUser } = user;

    return { token, user: safeUser };
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
