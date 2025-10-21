// interfaces/routes/specializedPostRoutes.ts
import { Router } from 'express';
import { makeSpecializedPostController } from '../factories/makeSpecializedPostController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specializedController = makeSpecializedPostController();
const specializedRoutes = Router();

/**
 * @swagger
 * /specialized/events:
 *   get:
 *     summary: Lista posts da categoria Eventos
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Lista de eventos paginada
 */
specializedRoutes.get('/events', ensureAuthenticated, specializedController.getEvents);

/**
 * @swagger
 * /specialized/donations:
 *   get:
 *     summary: Lista posts da categoria Doações
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Lista de doações paginada
 */
specializedRoutes.get('/donations', ensureAuthenticated, specializedController.getDonations);

/**
 * @swagger
 * /specialized/services:
 *   get:
 *     summary: Lista posts das categorias de Serviços (Voluntariado, Cursos, Ofertas de Emprego)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Lista de serviços paginada
 */
specializedRoutes.get('/services', ensureAuthenticated, specializedController.getServices);

export default specializedRoutes;