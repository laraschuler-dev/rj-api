import express from 'express';
import { makeAuthController } from '../factories/makeAuthController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const authController = makeAuthController();
const router = express.Router();

/**
 * Rotas de autenticação.
 *
 * Esse arquivo define as rotas de autenticação para o aplicativo.
 */

/**
 * Rota para criar um novo usuário.
 * @swagger
 * /auth/users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar o usuário
 */
router.post('/users', authController.register);

/**
 * Rota para realizar login.
 * @swagger
 * /auth/session:
 *   post:
 *     summary: Realiza o login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - emailOrPhone
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                       nullable: true
 *       400:
 *         description: Erro ao realizar login
 */
router.post('/session', authController.login);

/**
 * Rota para solicitar recuperação de senha.
 * @swagger
 * /auth/forgot:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: E-mail de recuperação enviado
 *       400:
 *         description: Erro na solicitação
 */
router.post('/forgot', authController.requestPasswordReset);

/**
 * Rota para redefinir a senha.
 * @swagger
 * /auth/reset:
 *   post:
 *     summary: Redefine a senha do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - token
 *               - newPassword
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Erro na redefinição
 */
router.post('/reset', authController.resetPassword);

/**
 * Rota para obter os dados da sessão do usuário autenticado.
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/me', ensureAuthenticated, authController.getSession);

/**
 * @swagger
 * /auth/account:
 *   delete:
 *     summary: Exclui logicamente a conta do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Senha atual para confirmação
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Conta excluída com sucesso
 *       400:
 *         description: Erro na exclusão (senha incorreta, etc.)
 *       401:
 *         description: Não autenticado
 */
router.delete('/account', ensureAuthenticated, authController.deleteAccount);

/**
 * @swagger
 * /auth/account:
 *   put:
 *     summary: Atualiza dados da conta do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Conta atualizada com sucesso
 *       400:
 *         description: Erro na atualização
 *       401:
 *         description: Não autenticado
 */
router.put('/account', ensureAuthenticated, authController.updateAccount);

/**
 * @swagger
 * /auth/password:
 *   put:
 *     summary: Atualiza a senha do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Erro na atualização
 *       401:
 *         description: Não autenticado
 */
router.put('/password', ensureAuthenticated, authController.updatePassword);

export default router;
