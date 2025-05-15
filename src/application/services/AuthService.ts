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

/**
 * Serviço responsável por autenticação e gerenciamento de usuários.
 * Este serviço contém a lógica de negócios para registro, login, recuperação de senha e redefinição de senha.
 */
export class AuthService {
  private jwtSecret: string;

  /**
   * Construtor do AuthService.
   * @param userRepository - Repositório de usuários para interagir com o banco de dados.
   * @param passwordRecoveryService - Serviço responsável pela lógica de recuperação de senha.
   * @param jwtSecret - Chave secreta usada para gerar tokens JWT.
   */
  constructor(
    private userRepository: UserRepository,
    private passwordRecoveryService: PasswordRecoveryService,
    jwtSecret: string
  ) {
    this.jwtSecret = jwtSecret;
  }

  /**
   * Registra um novo usuário no sistema.
   * @param data - Dados do usuário para registro (nome, e-mail, telefone, senha).
   * @returns Dados do usuário registrado (id, nome, e-mail, telefone).
   * @throws Erro caso o e-mail ou telefone já estejam cadastrados ou os dados sejam inválidos.
   */
  async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    // Validações de e-mail, telefone e senha
    if (!validator.isEmail(data.email)) {
      throw new Error('Email inválido');
    }

    const cleanedPhone = data.phone.replace(/\D/g, '');
    const phoneRegex = /^\d{2}\d{8,9}$/;
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

    // Verifica se o e-mail ou telefone já estão cadastrados
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

    // Cria o usuário com a senha criptografada
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

  /**
   * Realiza o login de um usuário.
   * @param data - Dados de login (e-mail ou telefone e senha).
   * @returns Token JWT e informações do usuário autenticado.
   * @throws Erro caso o usuário não seja encontrado ou a senha esteja incorreta.
   */
  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { emailOrPhone, password } = data;
    const sanitizedInput = emailOrPhone.trim().replace(/\D/g, '');

    // Busca o usuário pelo e-mail ou telefone
    const user =
      (await this.userRepository.findByEmailOrPhone(emailOrPhone)) ||
      (await this.userRepository.findByEmailOrPhone(sanitizedInput));

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica a senha
    const isPasswordValid = await this.verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    // Gera o token JWT
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

  /**
   * Envia um e-mail de recuperação de senha para o usuário.
   * @param data - Dados para recuperação de senha (e-mail).
   * @throws Erro caso o e-mail não seja válido ou o envio falhe.
   */
  async forgotPassword(data: ForgotPasswordRequestDTO): Promise<void> {
    // Valida o formato do e-mail
    if (!validator.isEmail(data.email)) {
      throw new Error('E-mail inválido');
    }

    // Verifica se o e-mail existe no sistema
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('E-mail não encontrado');
    }

    // Envia o e-mail de recuperação de senha
    await this.passwordRecoveryService.sendRecoveryEmail(data.email);
  }

  /**
   * Redefine a senha de um usuário com base em um token de recuperação.
   * @param data - Dados para redefinição de senha (token e nova senha).
   * @throws Erro caso o token seja inválido ou a nova senha não atenda aos critérios.
   */
  async resetPassword(data: ResetPasswordRequestDTO): Promise<void> {
    await this.passwordRecoveryService.resetPassword(data);
  }

  /**
   * Verifica se a senha fornecida corresponde ao hash armazenado.
   * @param hashedPassword - Hash da senha armazenada.
   * @param password - Senha fornecida pelo usuário.
   * @returns `true` se a senha for válida, caso contrário, `false`.
   */
  private async verifyPassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Gera um token JWT para o usuário autenticado.
   * @param user - Dados do usuário.
   * @returns Token JWT.
   */
  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }
}
