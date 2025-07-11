import { Router } from 'express';
import { makePostController } from '../factories/makePostController';
import upload from '../../../config/multer';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const postController = makePostController();
const postRoutes = Router();

/**
 * Rotas de posts.
 * 
 * Esse arquivo define as rotas de posts para o aplicativo.
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Operações relacionadas a posts
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post com imagens
 *     description: Cria um novo post com possíveis anexos de imagens (até 5 arquivos, 5MB cada)
 *     tags: [Posts]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token no formato "Bearer {token}"
 *         example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - categoria_idcategoria
 *               - content
 *             properties:
 *               categoria_idcategoria:
 *                 type: integer
 *                 format: int32
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: "Preciso de ajuda com doações de roupas"
 *               metadata:
 *                 type: string
 *                 description: JSON string dos metadados, contendo campos obrigatórios definidos pela categoria
 *                 example: '{"title":"Doação de Roupas","itemType":"Roupas", "condition": "usado", "location": "Zona Leste", "availability": "manhã"}'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostWithImages'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios faltando
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostWithImages:
 *       type: object
 *       properties:
 *         idpost:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: "Preciso de ajuda com doações de roupas"
 *         user_iduser:
 *           type: integer
 *           example: 123
 *         categoria_idcategoria:
 *           type: integer
 *           example: 1
 *         time:
 *           type: string
 *           format: date-time
 *           example: "2023-05-15T10:00:00Z"
 *         metadata:
 *           type: object
 *           example:
 *             title: "Doação de Roupas"
 *             itemType: "Roupas"
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               idimage:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 example: "uploads/123456789-imagem.jpg"
 */
postRoutes.post(
  '/',
  ensureAuthenticated,
  upload.array('images', 5),
  postController.create
);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista os posts públicos paginados e ordenados por data de criação (mais recentes primeiro)
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página da listagem
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de posts por página
 *     responses:
 *       200:
 *         description: Lista de posts paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PostListItem'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Erro ao buscar posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro ao buscar posts.
 *
 * components:
 *   schemas:
 *     PostListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: "Preciso de ajuda com doações de roupas"
 *         categoria_idcategoria:
 *           type: integer
 *           example: 2
 *         user_iduser:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 5
 *             name:
 *               type: string
 *               example: "Maria"
 *             avatarUrl:
 *               type: string
 *               example: "uploads/123456789-avatar.jpg"
 *         metadata:
 *           type: object
 *           example:
 *             title: "Doação de Roupas"
 *             itemType: "Roupas"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "uploads/123456789-imagem.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-05-15T10:00:00Z"
 */
postRoutes.get('/', ensureAuthenticated, postController.list);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtém os detalhes completos de um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post a ser consultado
 *         schema:
 *           type: integer
 *           example: 34
 *     responses:
 *       200:
 *         description: Detalhes do post retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostDetails'
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Post não encontrado
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     PostDetails:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 34
 *         content:
 *           type: string
 *           example: "Preciso de ajuda com doações de roupas"
 *         categoria_idcategoria:
 *           type: integer
 *           example: 1
 *         user_iduser:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 14
 *             name:
 *               type: string
 *               example: "Lara das Graças Schüler"
 *             avatarUrl:
 *               type: string
 *               example: "uploads/123456789-avatar.jpg"
 *         metadata:
 *           type: object
 *           example:
 *             title: "Doação de Roupas"
 *             itemType: "Roupas"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "uploads/123456789-imagem.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-10T20:21:56.000Z"
 */
postRoutes.get('/:id', ensureAuthenticated, postController.getById);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Curtir ou descurtir um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Retorna se o post foi curtido ou descurtido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Post não encontrado
 */
postRoutes.post('/:id/like', ensureAuthenticated, postController.like);

export default postRoutes;
