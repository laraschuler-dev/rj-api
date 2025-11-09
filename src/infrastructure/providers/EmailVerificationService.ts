// src/infrastructure/providers/EmailVerificationService.ts
import nodemailer from 'nodemailer';

/**
 * Serviço de email de verificação usando Gmail
 * Simples, gratuito e funcional
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.VERIFICATION_EMAIL_USERNAME,
    pass: process.env.VERIFICATION_EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"Redefinindo Jornadas" <${process.env.VERIFICATION_EMAIL_USERNAME}>`,
      to,
      subject,
      html,
    });
    console.log('✅ Email de verificação enviado para:', to);
  } catch (error: any) {
    console.error('❌ Erro ao enviar email:', error.message);
    throw new Error('Falha ao enviar email de verificação. Tente novamente.');
  }
};

// Função vazia - não é mais usada, mas mantemos para não quebrar imports
export const sendVerificationEmailFallback = async (): Promise<void> => {
  // Não faz nada - mantida apenas para compatibilidade
};