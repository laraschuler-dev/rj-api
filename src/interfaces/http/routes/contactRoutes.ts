import { Router } from 'express';
import { sendContact } from '../controllers/ContactController';

const router = Router();

/**
 * Arquivo de definição das rotas relacionadas ao contato da plataforma.
 * 
 * Este módulo registra as rotas HTTP para envio de mensagens de contato,
 * conectando as requisições ao controller responsável.
 * 
 * As rotas estão documentadas com Swagger logo acima de cada endpoint.
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Envia uma mensagem de contato para a plataforma.
 *     tags:
 *       - Contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               message:
 *                 type: string
 *                 example: Gostaria de saber mais sobre a plataforma.
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mensagem enviada com sucesso!
 *       400:
 *         description: Erro de validação ou envio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Todos os campos são obrigatórios.
 */
router.post('/', sendContact);

export default router;