import nodemailer from 'nodemailer';

/**
 * Configuração do transporte de e-mails utilizando o Nodemailer.
 * Utiliza o serviço Gmail para envio de e-mails.
 */
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, // E-mail configurado no ambiente
    pass: process.env.EMAIL_PASSWORD, // Senha de aplicativo configurada no ambiente
  },
});

/**
 * Envia um e-mail utilizando o transporte configurado.
 * 
 * @param to - Endereço de e-mail do destinatário.
 * @param subject - Assunto do e-mail.
 * @param html - Conteúdo HTML do e-mail.
 * 
 * @throws Lança um erro caso o envio do e-mail falhe.
 */
export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> => {
  await transporter.sendMail({
    from: `"Redefinindo Jornadas" <${process.env.EMAIL_USERNAME}>`, // Nome e e-mail do remetente
    to, // Destinatário
    subject, // Assunto do e-mail
    html, // Conteúdo HTML do e-mail
  });
};