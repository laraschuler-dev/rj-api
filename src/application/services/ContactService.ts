import { sendEmail } from '../../infrastructure/providers/EmailService';
import { ContactRequestDTO } from '../../core/dtos/ContactRequestDTO';

/**
 * Serviço responsável por gerenciar requisições de contato.
 * 
 * Esse serviço fornece métodos para enviar mensagens de contato para a plataforma.
 */
export class ContactService {
  /**
   * Envia uma mensagem de contato para a plataforma.
   * 
   * @param data - Dados de contato (nome, e-mail e mensagem).
   * @throws Erro caso os campos sejam inválidos.
   */
  async sendContactMessage(data: ContactRequestDTO): Promise<void> {
    // Validação simples
    if (!data.name || !data.email || !data.message) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    /**
     * Envia o e-mail para o destinatário.
     * 
     * @param to - Endereço de e-mail do destinatário.
     * @param subject - Assunto do e-mail.
     * @param html - Conteúdo do e-mail em formato HTML.
     */
    await sendEmail({
      to: 'redefinindojornadas@gmail.com',
      subject: `Contato via plataforma - ${data.name}`,
      html: `
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${data.message}</p>
      `,
    });
  }
}