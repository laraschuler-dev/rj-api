import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, // seu email
    pass: process.env.EMAIL_PASSWORD, // senha de app
  },
});

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
    from: `"Sua App" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  });
};