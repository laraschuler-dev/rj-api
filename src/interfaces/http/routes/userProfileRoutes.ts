import { Router } from 'express';
import { makeUserProfileController } from '../factories/makeUserProfileController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import upload from '../../../config/multer';

const userProfileController = makeUserProfileController();
const router = Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Perfil não encontrado
 *   put:
 *     summary: Atualiza o perfil do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profile_type:
 *                 type: string
 *                 enum: [psr, volunteer, ong, company, public_institution]
 *               profile_photo:
 *                 type: string
 *                 nullable: true
 *               bio:
 *                 type: string
 *                 nullable: true
 *               city:
 *                 type: string
 *                 nullable: true
 *               state:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       400:
 *         description: Erro de validação
 */
router.get('/', ensureAuthenticated, userProfileController.getProfile);
router.put('/', ensureAuthenticated, userProfileController.updateProfile);

/**
 * @swagger
 * /profile/public/{userId}:
 *   get:
 *     summary: Retorna o perfil público de um usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Perfil público retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   properties:
 *                     profile_type:
 *                       type: string
 *                     translated_type:
 *                       type: string
 *                     profile_photo:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: ID inválido
 */
router.get('/public/:userId', userProfileController.getPublicProfile);

/**
 * @swagger
 * /profile/photo:
 *   put:
 *     summary: Atualiza a foto de perfil do usuário autenticado
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil atualizada com sucesso
 *       400:
 *         description: Nenhuma imagem enviada
 *       401:
 *         description: Não autenticado
 */
router.put(
  '/photo',
  ensureAuthenticated,
  upload.single('profile_photo'),
  userProfileController.updateProfilePhoto
);

export default router;
