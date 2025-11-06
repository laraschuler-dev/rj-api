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
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verifica o e-mail do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: E-mail verificado com sucesso
 *       400:
 *         description: Token inválido ou expirado
 */
router.post('/verify-email', authController.verifyEmail);

/**
 * @swagger
 * /auth/resend-verification:
 *   post:
 *     summary: Reenvia o e-mail de verificação
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
 *         description: E-mail de verificação reenviado
 *       400:
 *         description: Erro ao reenviar e-mail
 */
router.post('/resend-verification', authController.resendVerification);

/**
 * @swagger
 * /auth/verification-status:
 *   get:
 *     summary: Obtém o status de verificação do e-mail
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verified:
 *                   type: boolean
 *       401:
 *         description: Não autenticado
 */
router.get('/verification-status', ensureAuthenticated, authController.getVerificationStatus);

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

/**
 * Rota para login via Google OAuth.
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Realiza login com conta Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Token de autenticação fornecido pelo Google
 *             required:
 *               - idToken
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
 *         description: Erro ao realizar login (token inválido ou conflito de conta)
 */
router.post('/google', authController.loginWithGoogle);

/**
 * @swagger
 * /auth/google/link:
 *   post:
 *     summary: Vincula uma conta Google a um usuário existente
 *     description: Permite que um usuário com conta tradicional vincule uma conta Google para login social
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Token de autenticação fornecido pelo Google
 *                 example: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij..."
 *             required:
 *               - idToken
 *     responses:
 *       200:
 *         description: Conta Google vinculada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Novo token JWT com informações atualizadas
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
 *                     hasGoogle:
 *                       type: boolean
 *                       description: Indica se tem Google vinculado
 *       400:
 *         description: Erro ao vincular conta (token inválido, email diferente, etc)
 *       401:
 *         description: Usuário não autenticado
 */
router.post('/google/link', ensureAuthenticated, authController.linkGoogleAccount);

/**
 * @swagger
 * /auth/google/unlink:
 *   post:
 *     summary: Desvincula a conta Google de um usuário
 *     description: Remove a vinculação com o Google (requer confirmação com senha)
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
 *                 description: Senha atual para confirmação de segurança
 *                 example: "minhaSenha123"
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Conta Google desvinculada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 hasGoogle:
 *                   type: boolean
 *       400:
 *         description: Erro ao desvincular (senha incorreta, não tem Google vinculado, etc)
 *       401:
 *         description: Usuário não autenticado
 */
router.post('/google/unlink', ensureAuthenticated, authController.unlinkGoogleAccount);

/**
 * @swagger
 * /auth/social-connections:
 *   get:
 *     summary: Obtém as conexões sociais do usuário
 *     description: Retorna informações sobre quais provedores sociais estão vinculados à conta
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conexões sociais obtidas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasGoogle:
 *                   type: boolean
 *                   description: Indica se tem Google vinculado
 *                 connectedProviders:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["google"]
 *       401:
 *         description: Usuário não autenticado
 */
router.get('/social-connections', ensureAuthenticated, authController.getSocialConnections);

export default router;
