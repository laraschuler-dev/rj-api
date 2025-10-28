import { randomBytes } from 'crypto';
import { UserRepository } from '../../core/repositories/UserRepository';
import { sendEmail } from '../../infrastructure/providers/EmailService';
import { hash } from 'bcryptjs';
import { ResetPasswordRequestDTO } from '../../core/dtos/ResetPasswordRequestDTO';
import dayjs from 'dayjs';

/**
 * Serviço responsável pela lógica de recuperação e redefinição de senha.
 * Este serviço gerencia o envio de e-mails de recuperação e a validação de tokens para redefinição de senha.
 */
export class PasswordRecoveryService {
  /**
   * Construtor do PasswordRecoveryService.
   * @param userRepository - Repositório de usuários para interagir com o banco de dados.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * Envia um e-mail de recuperação de senha para o usuário.
   * @param email - E-mail do usuário que solicitou a recuperação de senha.
   * @throws Não lança erros diretamente para evitar revelar se o e-mail existe no sistema.
   */
  async sendRecoveryEmail(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return; // Segurança: não revelar se o e-mail existe

    // Gera um token de recuperação e define a expiração
    const token = randomBytes(32).toString('hex');
    const expiration = dayjs().add(1, 'hour').toDate(); // Expira em 1 hora

    // Salva o token e a expiração no banco de dados
    await this.userRepository.savePasswordResetToken(user.id, token, expiration);

    // Gera o link de recuperação
    const recoveryLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Envia o e-mail de recuperação
    await sendEmail({
      to: email,
      subject: 'Recuperação de senha',
      html: `
        <p>Você solicitou a recuperação de senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${recoveryLink}">${recoveryLink}</a>
        <p>Se você não fez essa solicitação, ignore este e-mail.</p>
      `,
    });
  }

  /**
   * Redefine a senha de um usuário com base em um token de recuperação.
   * @param data - Dados para redefinição de senha (token e nova senha).
   * @throws Erro caso o token seja inválido, expirado ou a nova senha não atenda aos critérios.
   */
  async resetPassword({
    token,
    newPassword,
  }: ResetPasswordRequestDTO): Promise<void> {
    // Busca o usuário pelo token de recuperação
    const user = await this.userRepository.findByPasswordResetToken(token);

    // Verifica se o token é válido e não expirou
    if (
      !user ||
      !user.passwordResetTokenExpiresAt ||
      dayjs(user.passwordResetTokenExpiresAt).isBefore(dayjs())
    ) {
      throw new Error('Token inválido ou expirado');
    }

    // Valida a nova senha
    const passwordRegex =  /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new Error(
        'A senha deve ter pelo menos 6 caracteres e conter letras e números.'
      );
    }

    // Criptografa a nova senha
    const hashedPassword = await hash(newPassword, 10);

    // Atualiza a senha do usuário e limpa o token de recuperação
    await this.userRepository.updatePasswordAndClearResetToken(
      user.id,
      hashedPassword
    );
  }
}