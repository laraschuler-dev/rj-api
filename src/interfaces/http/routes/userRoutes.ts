// src/interfaces/http/routes/userRoutes.ts
import { Router } from 'express';
import { makePostController } from '../factories/makePostController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { makeUserSearchController } from '../factories/makeUserSearchController';

const router = Router();
const postController = makePostController();
const userSearchController = makeUserSearchController();

/**
 * @swagger
 * /users/{id}/posts:
 *   get:
 *     summary: Lista os posts públicos de um usuário específico
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id/posts', ensureAuthenticated, postController.getPostsByUser);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Busca usuários por nome ou email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo de busca (mínimo 2 caracteres)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de usuários encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                           avatarUrl:
 *                             type: string
 *                           profileType:
 *                             type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalCount:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *       400:
 *         description: Termo de busca inválido
 */
router.get('/search', userSearchController.searchUsers); // 👈 Adicione esta linha

export default router;