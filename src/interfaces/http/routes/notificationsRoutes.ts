// src/infrastructure/express/routes/notificationRoutes.ts
import { Router } from 'express';
import { makeNotificationController } from '../factories/makeNotificationController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const notificationController = makeNotificationController();
const router = Router();

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Lista notificações do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de itens por página
 *     responses:
 *       200:
 *         description: Notificações listadas com sucesso
 *       401:
 *         description: Não autenticado
 */
router.get('/', ensureAuthenticated, notificationController.getNotifications);

/**
 * @swagger
 * /notifications/unread-count:
 *   get:
 *     summary: Retorna contador de notificações não lidas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contador retornado com sucesso
 *       401:
 *         description: Não autenticado
 */
router.get(
  '/unread-count',
  ensureAuthenticated,
  notificationController.getUnreadCount
);

export default router;
