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
import { UpdateAccountDTO } from '../../core/dtos/UpdateAccountDTO';
import { UpdatePasswordDTO } from '../../core/dtos/UpdatePasswordDTO';
import { DeleteAccountDTO } from '../../core/dtos/DeleteAccountDTO';
import { OAuth2Client } from 'google-auth-library';
import { UserSocialConnectionRepository } from '../../core/repositories/UserSocialConnectionRepository';
import { UserSocialConnection } from '../../core/entities/UserSocialConnection';
import { EmailVerificationService } from './EmailVerificationService';

/**
 * Serviço responsável por autenticação e gerenciamento de usuários.
 * Este serviço contém a lógica de negócios para registro, login, recuperação de senha e redefinição de senha.
 */
export class AuthService {
  private jwtSecret: string;
  private googleClient: OAuth2Client;

  /**
   * Construtor do AuthService.
   * @param userRepository - Repositório de usuários para interagir com o banco de dados.
   * @param passwordRecoveryService - Serviço responsável pela lógica de recuperação de senha.
   * @param jwtSecret - Chave secreta usada para gerar tokens JWT.
   */
  constructor(
    private userRepository: UserRepository,
    private passwordRecoveryService: PasswordRecoveryService,
    private userSocialConnectionRepository: UserSocialConnectionRepository,
    private emailVerificationService: EmailVerificationService,
    jwtSecret: string
  ) {
    this.jwtSecret = jwtSecret;
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      throw new Error(
        'A senha deve ter pelo menos 6 caracteres e conter letras e números.'
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

    this.emailVerificationService
      .sendVerificationEmail(createdUser.email)
      .catch((error) => {
        console.error('Erro ao enviar e-mail de verificação:', error);
        // Não falha o registro se o e-mail não for enviado
      });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
    };
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      await this.emailVerificationService.confirmEmail(token);
    } catch (error: any) {
      if (error.message.includes('expirado')) {
        throw new Error('Link de verificação expirado. Solicite um novo.');
      }
      if (error.message.includes('inválido')) {
        throw new Error('Link de verificação inválido.');
      }
      throw error;
    }
  }

  // Método para reenviar verificação
  async sendNewVerificationEmail(email: string): Promise<void> {
    await this.emailVerificationService.sendNewVerificationEmail(email);
  }

  /**
   * Realiza a exclusão lógica da conta do usuário.
   * @param userId - ID do usuário.
   * @param data - Dados para confirmação da exclusão (senha e motivo opcional).
   * @throws Erro caso a senha esteja incorreta ou o usuário não seja encontrado.
   */
  async deleteAccount(userId: number, data: DeleteAccountDTO): Promise<void> {
    const user = await this.userRepository.findByIdUser(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se a conta já está excluída
    const isDeleted = await this.userRepository.isUserDeleted(userId);
    if (isDeleted) {
      throw new Error('Esta conta já foi excluída');
    }

    // ✅ VALIDAÇÃO SEGURA: Contas com senha precisam confirmar
    const hasPassword = user.password && user.password.trim() !== '';

    if (hasPassword) {
      // Conta tradicional: EXIGE senha
      if (!data.password) {
        throw new Error(
          'Senha é obrigatória para confirmar a exclusão da conta.'
        );
      }

      const isPasswordValid = await this.verifyPassword(
        user.password,
        data.password
      );
      if (!isPasswordValid) {
        throw new Error(
          'Senha incorreta. A exclusão da conta requer confirmação da senha atual.'
        );
      }
    } else {
      // Conta social: NÃO precisa de senha, mas pode ter validação extra
      console.log('🟡 Conta social sendo excluída sem validação de senha');
    }

    // Realiza a exclusão lógica
    await this.userRepository.softDeleteUser(userId);
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

    // Busca o usuário
    const user =
      (await this.userRepository.findByEmailOrPhone(emailOrPhone)) ||
      (await this.userRepository.findByEmailOrPhone(sanitizedInput));

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // ✅ Validação de usuários legados
    if (user.emailVerified === false) {
      throw new Error('E-mail não verificado. Verifique sua caixa de entrada.');
    }

    // Verifica senha
    const isPasswordValid = await this.verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    // ✅ Busca conexões sociais
    const socialConnections =
      await this.userSocialConnectionRepository.findByUserId(user.id);

    const hasGoogle = socialConnections.some(
      (conn) => conn.provider === 'google'
    );

    // Gera token
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isSocialLogin: false,
        hasGoogle,
      },
    };
  }

  /**
   * Realiza o login de um usuário com o Google.
   * @param idToken - Token de autenticação do Google.
   * @returns Token JWT e informações do usuário autenticado.
   * @throws Erro caso o token do Google seja inválido.
   */
  async loginWithGoogle(idToken: string): Promise<LoginResponseDTO> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      throw new Error('Google token inválido');
    }

    // ✅ PRIMEIRO VERIFICA SE EXISTE CONEXÃO GOOGLE
    let socialConnection =
      await this.userSocialConnectionRepository.findByProviderId(
        'google',
        payload.sub
      );

    let user;

    if (socialConnection) {
      // ✅ USUÁRIO JÁ TEM CONEXÃO GOOGLE - busca o user COM VALIDAÇÃO DE CONTA DELETADA
      user = await this.userRepository.findByIdUser(socialConnection.userId);
      if (!user) {
        throw new Error('Conta vinculada ao Google não encontrada.');
      }

      // ✅ VERIFICA SE A CONTA ESTÁ DELETADA
      const isDeleted = await this.userRepository.isUserDeleted(user.id);
      if (isDeleted) {
        throw new Error('Esta conta foi excluída e não pode ser acessada.');
      }
    } else {
      // ✅ NÃO TEM CONEXÃO GOOGLE - verifica se existe user pelo email
      user = await this.userRepository.findByEmail(payload.email);

      if (user) {
        // ✅ VERIFICA SE A CONTA ESTÁ DELETADA
        const isDeleted = await this.userRepository.isUserDeleted(user.id);
        if (isDeleted) {
          throw new Error('Esta conta foi excluída e não pode ser vinculada.');
        }

        // ✅ USER EXISTE E NÃO ESTÁ DELETADO - cria conexão Google
        socialConnection = new UserSocialConnection(
          0,
          user.id,
          'google',
          payload.sub,
          payload.email,
          new Date()
        );
        await this.userSocialConnectionRepository.create(socialConnection);
      } else {
        // ✅ USER NÃO EXISTE - cria novo user E conexão
        const newUser = new User(
          0,
          payload.name || 'Usuário Google',
          payload.email,
          '',
          null
        );
        user = await this.userRepository.create(newUser);

        socialConnection = new UserSocialConnection(
          0,
          user.id,
          'google',
          payload.sub,
          payload.email,
          new Date()
        );
        await this.userSocialConnectionRepository.create(socialConnection);
      }
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone?.trim() || null,
        isSocialLogin: !user.password, // conta original sem senha
        hasGoogle: true, // ✅ AGORA SEMPRE TRUE PARA LOGIN GOOGLE
      },
    };
  }

  /**
   * Vincula uma conta Google a um usuário existente
   * @param userId - ID do usuário
   * @param idToken - Token de autenticação do Google
   * @returns Token JWT e informações atualizadas do usuário
   * @throws Erro caso o token seja inválido ou já esteja vinculado
   */
  async linkGoogleAccount(
    userId: number,
    idToken: string
  ): Promise<LoginResponseDTO> {
    // Verifica token Google
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      throw new Error('Token Google inválido');
    }

    const user = await this.userRepository.findByIdUser(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // ✅ VERIFICA SE A CONTA ESTÁ DELETADA
    const isDeleted = await this.userRepository.isUserDeleted(userId);
    if (isDeleted) {
      throw new Error('Não é possível vincular Google a uma conta excluída.');
    }

    // ✅ VERIFICA SE O EMAIL DO GOOGLE É O MESMO DA CONTA
    if (payload.email !== user.email) {
      throw new Error(
        'O email da conta Google deve ser o mesmo da sua conta atual.'
      );
    }

    // ✅ VERIFICA SE JÁ EXISTE CONEXÃO GOOGLE PARA ESTE USUÁRIO
    const existingConnection =
      await this.userSocialConnectionRepository.findByUserIdAndProvider(
        userId,
        'google'
      );
    if (existingConnection) {
      throw new Error('Sua conta já está vinculada ao Google.');
    }

    // ✅ VERIFICA SE ESTE GOOGLE ID JÁ ESTÁ VINCULADO A OUTRA CONTA
    const existingGoogleConnection =
      await this.userSocialConnectionRepository.findByProviderId(
        'google',
        payload.sub
      );
    if (existingGoogleConnection) {
      throw new Error('Esta conta Google já está vinculada a outra conta.');
    }

    // ✅ CRIA A CONEXÃO SOCIAL
    const socialConnection = new UserSocialConnection(
      0, // id será gerado automaticamente
      userId,
      'google',
      payload.sub, // Google ID único
      payload.email,
      new Date()
    );

    await this.userSocialConnectionRepository.create(socialConnection);

    // Gera novo token com informações atualizadas
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isSocialLogin: false, // Continua sendo conta tradicional
        hasGoogle: true, // ✅ NOVO CAMPO - indica que tem Google vinculado
      },
    };
  }

  /**
   * Desvincula a conta Google de um usuário
   * @param userId - ID do usuário
   * @param password - Senha para confirmação
   * @throws Erro caso a senha esteja incorreta ou não tenha Google vinculado
   */
  async unlinkGoogleAccount(userId: number, password: string): Promise<void> {
    const user = await this.userRepository.findByIdUser(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isDeleted = await this.userRepository.isUserDeleted(userId);
    if (isDeleted) {
      throw new Error(
        'Não é possível desvincular Google de uma conta excluída.'
      );
    }

    // ✅ VERIFICA SE TEM SENHA (conta tradicional)
    if (!user.password) {
      throw new Error(
        'Você precisa criar uma senha antes de desvincular o Google.'
      );
    }

    // ✅ VALIDA SENHA
    const isPasswordValid = await this.verifyPassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta.');
    }

    // ✅ VERIFICA SE TEM GOOGLE VINCULADO
    const googleConnection =
      await this.userSocialConnectionRepository.findByUserIdAndProvider(
        userId,
        'google'
      );
    if (!googleConnection) {
      throw new Error('Sua conta não está vinculada ao Google.');
    }

    // ✅ DESVINCULA GOOGLE
    await this.userSocialConnectionRepository.delete(userId, 'google');
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
      isSocialLogin: !user.password,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
  }

  async getAuthenticatedUser(userId: number): Promise<any> {
    const user = await this.userRepository.findByIdUser(userId);
    if (!user) throw new Error('Usuário não encontrado');

    const isDeleted = await this.userRepository.isUserDeleted(userId);
    if (isDeleted) {
      throw new Error('Esta conta foi excluída.');
    }

    // ✅ BUSCA CONEXÕES SOCIAIS DO USUÁRIO
    const socialConnections =
      await this.userSocialConnectionRepository.findByUserId(userId);
    const hasGoogle = socialConnections.some(
      (conn) => conn.provider === 'google'
    );

    const { password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      isSocialLogin: !user.password, // conta criada originalmente sem senha
      hasGoogle, // ✅ NOVO CAMPO
    };
  }

  async updateAccount(userId: number, data: UpdateAccountDTO): Promise<User> {
    try {
      // VALIDAÇÃO DE SEGURANÇA PARA CONTAS SOCIAIS
      const currentUser = await this.userRepository.findByIdUser(userId);
      if (!currentUser) throw new Error('Usuário não encontrado');

      // ✅ VERIFICA SE A CONTA ESTÁ DELETADA (nova validação)
      const isDeleted = await this.userRepository.isUserDeleted(userId);
      if (isDeleted) {
        throw new Error('Esta conta foi excluída.');
      }

      // ✅ VERIFICAÇÃO ROBUSTA PARA CONTAS SOCIAIS
      // Busca conexões sociais do usuário
      const socialConnections =
        await this.userSocialConnectionRepository.findByUserId(userId);
      const hasGoogle = socialConnections.some(
        (conn) => conn.provider === 'google'
      );

      // Se tem Google vinculado E está tentando alterar email
      if (hasGoogle && data.email && data.email !== currentUser.email) {
        throw new Error(
          'Contas vinculadas ao Google não podem alterar o email.'
        );
      }

      // ✅ VALIDAÇÃO ALTERNATIVA (backup): Se não tem senha E está tentando alterar email
      if (
        !currentUser.password &&
        data.email &&
        data.email !== currentUser.email
      ) {
        throw new Error('Contas sociais não podem alterar o email.');
      }

      // Validações consistentes com o método register
      if (data.email && !validator.isEmail(data.email)) {
        throw new Error('Email inválido');
      }

      // Validação específica para telefone (se fornecido e não nulo)
      if (
        data.phone !== undefined &&
        data.phone !== null &&
        data.phone !== ''
      ) {
        const cleanedPhone = data.phone.replace(/\D/g, '');
        const phoneRegex = /^\d{2}\d{8,9}$/;

        if (cleanedPhone && !phoneRegex.test(cleanedPhone)) {
          throw new Error(
            'Telefone inválido. Deve conter o DDD seguido de 8 ou 9 dígitos.'
          );
        }

        // Verificar se o telefone já está em uso por outro usuário
        if (cleanedPhone) {
          const existingUser =
            await this.userRepository.findByEmailOrPhone(cleanedPhone);
          if (existingUser && existingUser.id !== userId) {
            throw new Error(
              'Já existe um usuário com este telefone cadastrado.'
            );
          }
        }
      }

      // Preparar dados para atualização
      const updateData: {
        name?: string;
        email?: string;
        phone?: string | null;
      } = {
        ...data,
      };

      // Formatar telefone (se fornecido)
      if (data.phone !== undefined) {
        if (data.phone === null || data.phone === '') {
          updateData.phone = null;
        } else {
          updateData.phone = data.phone.replace(/\D/g, '').slice(0, 12);
        }
      }

      // Verificar duplicata de email (se fornecido)
      if (data.email) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser && existingUser.id !== userId) {
          throw new Error('Já existe um usuário com este e-mail cadastrado.');
        }
      }

      // Chamar repository (apenas persistência)
      return await this.userRepository.updateUserData(userId, updateData);
    } catch (error: any) {
      // Tratamento de erros de infraestrutura do repository
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        if (target?.includes('fone')) {
          throw new Error(
            'Este número de telefone já está em uso por outra conta.'
          );
        }
        if (target?.includes('e_mail')) {
          throw new Error('Este e-mail já está em uso por outra conta.');
        }
      }
      throw error;
    }
  }

  async updatePassword(userId: number, dto: UpdatePasswordDTO): Promise<void> {
    const user = await this.userRepository.findByIdUser(userId);
    if (!user) throw new Error('Usuário não encontrado.');

    // ✅ VALIDAÇÃO DA NOVA SENHA (para ambos os casos)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(dto.newPassword)) {
      throw new Error(
        'A senha deve ter pelo menos 6 caracteres e conter letras e números.'
      );
    }

    // ✅ LÓGICA PARA CONTAS SOCIAIS (sem senha atual)
    if (!user.password || user.password.trim() === '') {
      // Conta social: não precisa de senha atual, apenas cria a nova
      const newPasswordHash = await bcrypt.hash(dto.newPassword, 10);
      await this.userRepository.updatePassword(userId, newPasswordHash);
      return;
    }

    // LÓGICA PARA CONTAS TRADICIONAIS (com senha atual)
    if (!dto.currentPassword) {
      throw new Error('Senha atual é obrigatória para contas com senha.');
    }

    const passwordMatch = await bcrypt.compare(
      dto.currentPassword,
      user.password
    );
    if (!passwordMatch) throw new Error('Senha atual incorreta.');

    const newPasswordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.userRepository.updatePassword(userId, newPasswordHash);
  }
}
