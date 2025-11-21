// src/infrastructure/providers/EmailVerificationService.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Serviço de envio de email de verificação usando Resend (HTTP)
 * Funciona localmente e em produção (Render)
 */
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
    const response = await resend.emails.send({
      from: process.env.VERIFICATION_EMAIL_FROM!, // onboarding@resend.dev
      to,
      subject,
      html,
    });

    console.log('✅ Email de verificação enviado via Resend:', response);
  } catch (error: any) {
    console.error('❌ Erro ao enviar email via Resend:', error);
    throw new Error('Falha ao enviar email de verificação.');
  }
};

/**
 * Mantida apenas para não quebrar imports antigos
 */
export const sendVerificationEmailFallback = async (): Promise<void> => {
  // não utilizado
};
