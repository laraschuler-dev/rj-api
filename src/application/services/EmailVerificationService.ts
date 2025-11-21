// src/application/services/EmailVerificationService.ts
import { randomBytes } from 'crypto';
import { UserRepository } from '../../core/repositories/UserRepository';
import { sendVerificationEmail } from '../../infrastructure/providers/EmailVerificationService';
import dayjs from 'dayjs';

export class EmailVerificationService {
  constructor(private userRepository: UserRepository) {}

  async sendVerificationEmail(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return; // Segurança

    if (await this.isEmailVerified(user.id)) {
      throw new Error('E-mail já verificado');
    }

    const token = randomBytes(32).toString('hex');
    const expiration = dayjs().add(24, 'hour').toDate();

    await this.userRepository.saveEmailVerificationToken(
      user.id,
      token,
      expiration
    );

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const emailContent = {
      to: email,
      subject: 'Verifique seu e-mail - Rede Social Solidária',
      html: this.buildVerificationEmailHtml(user.name, verificationLink),
    };

    // ✅ AGORA SÓ USA GMAIL - SEM FALLBACK COMPLICADO
    await sendVerificationEmail(emailContent);
  }

  private buildVerificationEmailHtml(
    userName: string,
    verificationLink: string
  ): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0;">🌍 Rede Social Solidária</h1>
          <p style="color: #666; margin: 5px 0;">Conectando pessoas, transformando vidas</p>
        </div>
        
        <h2 style="color: #333;">Olá, ${userName}!</h2>
        
        <p>Estamos muito felizes por você fazer parte da nossa comunidade solidária! Para ativar sua conta e começar a usar todos os recursos, precisamos confirmar seu endereço de e-mail.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #2563eb; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 8px; font-size: 16px;
                    display: inline-block; font-weight: bold;">
            ✅ Confirmar Meu E-mail
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">Se o botão não funcionar, copie e cole este link no seu navegador:</p>
        <p style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all; font-size: 12px; color: #333;">
          ${verificationLink}
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #666; font-size: 12px;">
            <strong>Importante:</strong> Este link expira em 24 horas.<br>
            Se você não criou uma conta, ignore este e-mail.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Time Rede Social Solidária<br>
            <a href="mailto:redefinindojornadasvalidation@gmail.com" style="color: #2563eb;">redefinindojornadasvalidation@gmail.com</a>
          </p>
        </div>
      </div>
    `;
  }

  async confirmEmail(token: string): Promise<void> {
    const user = await this.userRepository.findByEmailVerificationToken(token);

    if (!user || !user.emailVerificationTokenExpiresAt) {
      throw new Error('Token de verificação inválido');
    }

    if (dayjs(user.emailVerificationTokenExpiresAt).isBefore(dayjs())) {
      throw new Error('Token de verificação expirado');
    }

    await this.userRepository.markEmailAsVerified(user.id);
  }

  async isEmailVerified(userId: number): Promise<boolean> {
    const user = await this.userRepository.findByIdUser(userId);
    return user?.emailVerified || false;
  }

  async sendNewVerificationEmail(email: string): Promise<void> {
    await this.sendVerificationEmail(email);
  }
}
