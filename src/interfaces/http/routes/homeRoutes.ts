// interfaces/routes/homeRoutes.ts
import { Router } from 'express';
import { makeHomeController } from '../factories/makeHomeController';

const homeController = makeHomeController();
const homeRoutes = Router();

/**
 * @swagger
 * /home/events:
 *   get:
 *     summary: Lista eventos para a home (público)
 *     tags: [Home]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *     responses:
 *       200:
 *         description: Lista de eventos para carrossel
 */
homeRoutes.get('/events', homeController.getHomeEvents);

/**
 * @swagger
 * /home/services:
 *   get:
 *     summary: Lista serviços para a home (público)
 *     tags: [Home]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 6
 *     responses:
 *       200:
 *         description: Lista de serviços para carrossel
 */
homeRoutes.get('/services', homeController.getHomeServices);

export default homeRoutes;