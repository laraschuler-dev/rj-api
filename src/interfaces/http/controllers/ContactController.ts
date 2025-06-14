import { Request, Response } from 'express';
import { ContactService } from '../../../application/services/ContactService';

const contactService = new ContactService();

/**
 * Controlador responsável por lidar com o envio de mensagens de contato.
 * Recebe os dados do formulário de contato e delega o envio ao serviço correspondente.
 */

/**
 * Trata o envio de uma mensagem de contato.
 * @param req - Objeto de requisição do Express contendo os dados de contato no corpo.
 * @param res - Objeto de resposta do Express usado para enviar de volta a mensagem de sucesso ou erro.
 * @returns Uma resposta JSON indicando sucesso ou uma mensagem de erro se a operação falhar.
 */

export const sendContact = async (req: Request, res: Response) => {
  try {
    await contactService.sendContactMessage(req.body);
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });    
  }
};