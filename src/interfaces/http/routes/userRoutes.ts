// src/interfaces/http/routes/userRoutes.ts
import { Router } from 'express';
import { makePostController } from '../factories/makePostController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();
const postController = makePostController();

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

export default router;
