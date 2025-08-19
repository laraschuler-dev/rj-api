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
 */

/**
 * @swagger
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
 *         liked:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-05-15T10:00:00Z"
 */
postRoutes.get('/', ensureAuthenticated, postController.listPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtém os detalhes completos de um post ou de um post compartilhado
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post (original ou compartilhado) a ser consultado
 *         schema:
 *           type: integer
 *           example: 34
 *       - in: query
 *         name: shareId
 *         required: false
 *         description: ID do compartilhamento do post (para buscar um post compartilhado)
 *         schema:
 *           type: integer
 *           example: 12
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
 *         content:
 *           type: string
 *         categoria_idcategoria:
 *           type: integer
 *         user_iduser:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             avatarUrl:
 *               type: string
 *         metadata:
 *           type: object
 *           example:
 *             title: "Doação de Roupas"
 *             itemType: "Roupas"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         sharedBy:
 *           type: object
 *           nullable: true
 *           description: Dados do usuário que compartilhou o post (caso aplicável)
 *           properties:
 *             userId:
 *               type: integer
 *             name:
 *               type: string
 *             avatarUrl:
 *               type: string
 *             message:
 *               type: string
 *             sharedAt:
 *               type: string
 *               format: date-time
 */

postRoutes.get('/:id', ensureAuthenticated, postController.getById);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Curte ou descurte um post (original ou compartilhado)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post original
 *         schema:
 *           type: integer
 *       - in: query
 *         name: shareId
 *         required: false
 *         description: ID do compartilhamento do post, se for o caso
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status da curtida
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
 *       500:
 *         description: Erro interno
 */
postRoutes.post('/:id/like', ensureAuthenticated, postController.like);

/**
 * @swagger
 * /posts/{id}/likes:
 *   get:
 *     summary: Lista os usuários que curtiram um post ou compartilhamento
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original (use com ou sem `shareId`)
 *       - in: query
 *         name: shareId
 *         schema:
 *           type: integer
 *         description: (Opcional) ID do compartilhamento. Use para listar curtidas de um post compartilhado.
 *     responses:
 *       200:
 *         description: Lista de usuários que curtiram o post ou compartilhamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       avatarUrl:
 *                         type: string
 *                         nullable: true
 *       500:
 *         description: Erro interno do servidor
 */
postRoutes.get('/:id/likes', postController.listLikes);

/**
 * @swagger
 * /posts/{id}/likes/count:
 *   get:
 *     summary: Retorna a quantidade de curtidas de um post ou compartilhamento
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original
 *       - in: query
 *         name: shareId
 *         schema:
 *           type: integer
 *         description: (Opcional) ID do compartilhamento. Use para contar curtidas de um post compartilhado.
 *     responses:
 *       200:
 *         description: Quantidade de curtidas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: integer
 *                 totalLikes:
 *                   type: integer
 *                 uniqueKey:
 *                   type: string
 *                   example: post-17
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
postRoutes.get('/:id/likes/count', postController.getLikeCount);

/**
 * @swagger
 * /posts/{id}/share:
 *   post:
 *     summary: Compartilhar um post
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Mensagem opcional para o compartilhamento
 *                 example: "Confira este post incrível!"
 *     responses:
 *       201:
 *         description: Post compartilhado com sucesso
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Post não encontrado
 */
postRoutes.post('/:id/share', ensureAuthenticated, postController.sharePost);

/**
 * @swagger
 * /posts/{id}/shares/count:
 *   get:
 *     summary: Retorna a quantidade de compartilhamentos de um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Quantidade de compartilhamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       404:
 *         description: Post não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
postRoutes.get('/:id/shares/count', postController.getShareCount);

/**
 * @swagger
 * /posts/{postId}/comments/count:
 *   get:
 *     summary: Retorna a quantidade de comentários de um post (original ou compartilhado)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original
 *       - in: query
 *         name: postShareId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do compartilhamento (opcional)
 *     responses:
 *       200:
 *         description: Quantidade de comentários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: integer
 *                 totalComments:
 *                   type: integer
 *       400:
 *         description: Erro nos parâmetros
 *       404:
 *         description: Post ou compartilhamento não encontrado
 */
postRoutes.get('/:postId/comments/count', postController.getCommentCount);

/**
 * @swagger
 * /posts/{id}/comment:
 *   post:
 *     summary: Adicionar um comentário a um post original ou compartilhado
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original
 *       - in: query
 *         name: shareId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do compartilhamento, obrigatório apenas quando for um comentário em post compartilhado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Parabéns pela iniciativa!"
 *     responses:
 *       201:
 *         description: Comentário adicionado com sucesso, retorna a uniqueKey do comentário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentário adicionado com sucesso
 *                 uniqueKey:
 *                   type: string
 *                   example: post:123:456:1678901234567
 *       400:
 *         description: Dados inválidos ou parâmetros ausentes
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Post ou compartilhamento não encontrado
 *       500:
 *         description: Erro ao adicionar comentário
 */
postRoutes.post(
  '/:id/comment',
  ensureAuthenticated,
  postController.commentPost
);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Editar um comentário
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Atualizei meu comentário anterior"
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Ação não permitida
 *       404:
 *         description: Comentário não encontrado
 */
postRoutes.put(
  '/:postId/comments/:commentId',
  ensureAuthenticated,
  postController.updateComment
);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Exclui logicamente um comentário
 *     description: Marca um comentário como excluído sem removê-lo fisicamente do banco de dados. Caso o comentário pertença a um post compartilhado, informe o campo postShareId como parâmetro de query.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original ao qual o comentário pertence
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário a ser excluído
 *       - in: query
 *         name: postShareId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do compartilhamento (caso o comentário pertença a um post compartilhado)
 *     responses:
 *       200:
 *         description: Comentário marcado como excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Requisição inválida ou comentário já excluído
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Ação não permitida
 *       404:
 *         description: Comentário não encontrado
 */
postRoutes.delete(
  '/:postId/comments/:commentId',
  ensureAuthenticated,
  postController.deleteComment
);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Editar um comentário
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: postShareId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do compartilhamento, caso o comentário pertença a um post compartilhado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Atualizei meu comentário anterior"
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Ação não permitida
 *       404:
 *         description: Comentário não encontrado
 */
postRoutes.get('/:id/comments', postController.listComments);

/**
 * @swagger
 * /posts/comments/{id}:
 *  get:
 *    summary: Buscar um comentário por ID (de post ou compartilhamento)
 *    tags:
 *      - Posts
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID do comentário
 *    responses:
 *      '200':
 *        description: Comentário encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                content:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                uniqueKey:
 *                  type: string
 *                  description: >
 *                    Identificador único do comentário, com base no tipo (post ou compartilhamento).
 *                    Formatos possíveis:
 *                    - post:{userId}:{postId}:{timestamp}
 *                    - shared:{sharerId}:{postId}:{timestamp}
 *                author:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    name:
 *                      type: string
 *                    avatarUrl:
 *                      type: string
 *                      nullable: true
 *      '400':
 *        description: ID inválido
 *      '404':
 *        description: Comentário não encontrado
 *      '500':
 *        description: Erro interno do servidor
 */
postRoutes.get('/comments/:id', postController.getSingleComment);

/**
 * @swagger
 * /posts/{id}/attend:
 *   post:
 *     summary: Marcar interesse ou presença em um evento
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original
 *       - in: query
 *         name: postShareId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do post compartilhado (caso esteja marcando presença em um compartilhamento)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [interested, confirmed]
 *                 description: Tipo de interesse/presença
 *     responses:
 *       200:
 *         description: Presença registrada com sucesso
 */
postRoutes.post('/:id/attend', ensureAuthenticated, postController.attendEvent);

/**
 * @swagger
 * /posts/{id}/attend-status:
 *   get:
 *     summary: Ver status de presença/interesse em um evento
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original
 *       - in: query
 *         name: postShareId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID do post compartilhado (opcional)
 *     responses:
 *       200:
 *         description: Status de presença retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userStatus:
 *                   type: string
 *                   enum: [interested, confirmed, null]
 *                 interestedCount:
 *                   type: integer
 *                 confirmedCount:
 *                   type: integer
 */
postRoutes.get('/:id/attend-status', ensureAuthenticated, postController.getAttendanceStatus);


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePostRequest:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: Conteúdo do post original (não usado em compartilhamentos)
 *           example: "Atualizei o conteúdo do post"
 *         metadata:
 *           type: string
 *           format: json
 *           description: Metadados do post original como string JSON (não usado em compartilhamentos)
 *           example: '{"title": "Nova campanha", "goal": "100 agasalhos"}'
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Arquivos de imagem atualizados para o post original (não usado em compartilhamentos)
 *         message:
 *           type: string
 *           description: Mensagem do compartilhamento (opcional; usado apenas em edição de compartilhamento)
 *           example: "Adicionei uma mensagem ao compartilhar este post"
 *         shareId:
 *           type: integer
 *           description: ID do compartilhamento (quando se edita um compartilhamento)
 *           example: 12
 */
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post original ou um compartilhamento
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post original
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostRequest'
 *     responses:
 *       200:
 *         description: Post ou compartilhamento atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Usuário não autorizado a editar o post ou compartilhamento
 *       404:
 *         description: Post ou compartilhamento não encontrado
 */
postRoutes.put(
  '/:id',
  ensureAuthenticated,
  upload.array('images', 5),
  postController.updatePost
);

/**
 * @swagger
 * /posts/{postId}/images/{imageId}:
 *   delete:
 *     summary: Remove uma imagem específica de um post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Imagem removida com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Ação não permitida
 *       404:
 *         description: Imagem não encontrada
 */
postRoutes.delete(
  '/:postId/images/:imageId',
  ensureAuthenticated,
  postController.deletePostImage
);

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Exclui logicamente um post
 *     description: Marca um post como excluído sem removê-lo fisicamente do banco de dados
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post a ser excluído
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Ação não permitida
 *       404:
 *         description: Post não encontrado
 */
postRoutes.delete('/:postId', ensureAuthenticated, postController.deletePost);

export default postRoutes;
