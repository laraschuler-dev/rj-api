import express from 'express';
import { AuthUseCases } from '../../../application/use-cases/AuthUseCases';
import { AuthService } from '../../../application/services/AuthService';
import { UserRepositoryPrisma } from '../../../infrastructure/database/repositories/UserRepositoryPrisma';

const userRepository = new UserRepositoryPrisma();
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const authService = new AuthService(userRepository, jwtSecret);
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
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar o usuário
 */
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await authUseCases.register({ name, email, password, phone });
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
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro ao realizar login
 */
router.post('/session', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    const { token, user } = await authUseCases.login({ emailOrPhone, password });
    res.status(200).json({ token, user }); // Retorna o token e o usuário autenticado
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(400).json({ error: errorMessage });
  }
});

export default router;