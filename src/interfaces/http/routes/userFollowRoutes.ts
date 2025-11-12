// src/infrastructure/routes/userFollowRoutes.ts
import { Router } from 'express';
import { makeUserFollowController } from '../factories/makeUserFollowController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userFollowController = makeUserFollowController();
const router = Router();

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Seguir um usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followingId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuário seguido com sucesso
 *       400:
 *         description: Erro ao seguir usuário
 *       401:
 *         description: Não autenticado
 */
router.post('/', ensureAuthenticated, userFollowController.followUser);

/**
 * @swagger
 * /follow/{followingId}:
 *   delete:
 *     summary: Deixar de seguir um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deixou de seguir com sucesso
 *       400:
 *         description: Erro ao deixar de seguir
 *       401:
 *         description: Não autenticado
 */
router.delete(
  '/:followingId',
  ensureAuthenticated,
  userFollowController.unfollowUser
);

/**
 * @swagger
 * /follow/{userId}/followers:
 *   get:
 *     summary: Listar seguidores de um usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de seguidores
 *       400:
 *         description: Erro ao buscar seguidores
 */
router.get('/:userId/followers', userFollowController.getFollowers);

/**
 * @swagger
 * /follow/{userId}/following:
 *   get:
 *     summary: Listar usuários seguidos por um usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de usuários seguidos
 *       400:
 *         description: Erro ao buscar usuários seguidos
 */
router.get('/:userId/following', userFollowController.getFollowing);

/**
 * @swagger
 * /follow/{userId}/stats:
 *   get:
 *     summary: Obter estatísticas de follow de um usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estatísticas de follow
 *       400:
 *         description: Erro ao buscar estatísticas
 */
router.get('/:userId/stats', userFollowController.getFollowStats);

/**
 * @swagger
 * /follow/check/{followingId}:
 *   get:
 *     summary: Verificar se está seguindo um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status do follow
 *       400:
 *         description: Erro ao verificar
 *       401:
 *         description: Não autenticado
 */
router.get(
  '/check/:followingId',
  ensureAuthenticated,
  userFollowController.checkIsFollowing
);

export default router;
