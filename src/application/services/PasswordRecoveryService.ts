import { randomBytes } from 'crypto';
import { UserRepository } from '../../core/repositories/UserRepository';
import { sendEmail } from '../../infrastructure/providers/EmailService';
import { hash } from 'bcryptjs';
import { ResetPasswordRequestDTO } from '../../core/dtos/ResetPasswordRequestDTO';
import dayjs from 'dayjs';

export class PasswordRecoveryService {
  constructor(private userRepository: UserRepository) {}

  async sendRecoveryEmail(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return; // Segurança: não revelar se o email existe

    const token = randomBytes(32).toString('hex');
    const expiration = dayjs().add(1, 'hour').toDate(); // Usando day.js para calcular a expiração

    await this.userRepository.savePasswordResetToken(
      user.id,
      token,
      expiration
    );

    const recoveryLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Incluindo o token no corpo do e-mail para testes
    await sendEmail({
      to: email,
      subject: 'Recuperação de senha',
      html: `
        <p>Você solicitou a recuperação de senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${recoveryLink}">${recoveryLink}</a>
        <p>Token para teste: ${token}</p>
        <p>Se você não fez essa solicitação, ignore este e-mail.</p>
      `,
    });
  }

  async resetPassword({
    token,
    newPassword,
  }: ResetPasswordRequestDTO): Promise<void> {

    const user = await this.userRepository.findByPasswordResetToken(token);

    if (
      !user ||
      !user.passwordResetTokenExpiresAt ||
      dayjs(user.passwordResetTokenExpiresAt).isBefore(dayjs())
    ) {
      console.log('Token inválido ou expirado');
      throw new Error('Token inválido ou expirado');
    }

    // Validação da nova senha
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new Error(
        'A nova senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.'
      );
    }

    const hashedPassword = await hash(newPassword, 10);

    await this.userRepository.updatePasswordAndClearResetToken(
      user.id,
      hashedPassword
    );
  }
}
