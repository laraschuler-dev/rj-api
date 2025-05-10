import express from 'express';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';
import { AuthService } from '../../../application/services/AuthService';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { RegisterRequestDTO } from '../../../core/dtos/RegisterRequestDTO';
import { LoginRequestDTO } from '../../../core/dtos/LoginRequestDTO';
import { PasswordRecoveryService } from '../../../application/services/PasswordRecoveryService';

// Instanciar dependências
const userRepository = new UserRepositoryPrisma();
const passwordRecoveryService = new PasswordRecoveryService(userRepository); // Instanciar o PasswordRecoveryService
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const authService = new AuthService(userRepository, passwordRecoveryService, jwtSecret); // Passar o PasswordRecoveryService
const authUseCases = new AuthUseCases(authService);
const router = express.Router();

/**
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
router.post('/users', async (req, res) => {
  try {
    const data: RegisterRequestDTO = req.body;
    const user = await authUseCases.register(data);
    res.status(201).json(user); // Retorna o recurso criado
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

/**
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
router.post('/session', async (req, res) => {
  try {
    const data: LoginRequestDTO = req.body;
    const { token, user } = await authUseCases.login(data);
    res.status(200).json({ token, user }); // Retorna o token e o usuário autenticado
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

/**
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
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    await authUseCases.requestPasswordReset(email);
    console.log('Forgot password route called with email:', email);
    res.status(200).json({ message: 'Password reset link sent if the email exists.' });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

/**
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
router.post('/reset', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authUseCases.resetPassword({ token, newPassword }); // Passar como um único objeto
    console.log('Reset password route called with token:', token);
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

export default router;