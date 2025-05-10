import express from 'express';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';
import { AuthService } from '../../../application/services/AuthService';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';
import { PasswordRecoveryService } from '../../../application/services/PasswordRecoveryService';
import { AuthController } from '../controllers/AuthController';

// Instanciar dependências
const userRepository = new UserRepositoryPrisma();
const passwordRecoveryService = new PasswordRecoveryService(userRepository);
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const authService = new AuthService(userRepository, passwordRecoveryService, jwtSecret);
const authUseCases = new AuthUseCases(authService);
const authController = new AuthController(authUseCases); // Instanciar o AuthController

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
router.post('/users', authController.register.bind(authController));

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
router.post('/session', authController.login.bind(authController));

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
router.post('/forgot', authController.requestPasswordReset.bind(authController));

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
router.post('/reset', authController.resetPassword.bind(authController));

export default router;