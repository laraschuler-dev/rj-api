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
    await this.userRepository.savePasswordResetToken(
      user.id,
      token,
      expiration
    );

    // Gera o link de recuperação
    const recoveryLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Envia o e-mail de recuperação ESTILIZADO
    await sendEmail({
      to: email,
      subject: 'Redefinir sua senha - Rede Social Solidária',
      html: this.buildRecoveryEmailHtml(user.name, recoveryLink),
    });
  }

  private buildRecoveryEmailHtml(
    userName: string,
    recoveryLink: string
  ): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🌍 Rede Social Solidária</h1>
          <p style="color: #666; margin: 5px 0;">Conectando pessoas, transformando vidas</p>
        </div>
        
        <h2 style="color: #333;">Olá, ${userName}!</h2>
        
        <p>Recebemos uma solicitação para redefinir a senha da sua conta. Para criar uma nova senha, clique no botão abaixo:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${recoveryLink}" 
             style="background-color: #2563eb; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 8px; font-size: 16px;
                    display: inline-block; font-weight: bold;">
            🔑 Redefinir Minha Senha
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">Se o botão não funcionar, copie e cole este link no seu navegador:</p>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 12px; color: #333;">
          ${recoveryLink}
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #666; font-size: 12px;">
            <strong>Importante:</strong> Este link expira em 1 hora.<br>
            Se você não solicitou a redefinição de senha, ignore este e-mail.<br>
            Sua senha atual continuará funcionando normalmente.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Time Rede Social Solidária<br>
            <a href="mailto:redefinindojornadasvalidation@gmail.com" style="color: #2563eb;">redefinindojornadasvalidation@gmail.com</a>
          </p>
        </div>
      </div>
    `;
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
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
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
