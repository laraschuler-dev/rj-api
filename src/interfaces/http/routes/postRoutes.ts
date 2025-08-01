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
 * /posts/{id}/comments/count:
 *   get:
 *     summary: Retorna a quantidade de comentários de um post
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
 *         description: Quantidade de comentários retornada com sucesso
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
postRoutes.get('/:id/comments/count', postController.getCommentCount);
/**
 * @swagger
 * /posts/{id}/comment:
 *   post:
 *     summary: Adicionar um comentário a um post ou compartilhamento
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post ou compartilhamento
 *       - in: query
 *         name: shared
 *         required: false
 *         schema:
 *           type: boolean
 *           example: false
 *         description: Indica se o comentário é para um post compartilhado (shared=true)
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
 *                 example: "Essa iniciativa é muito importante, parabéns!"
 *     responses:
 *       201:
 *         description: Comentário adicionado com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Post ou compartilhamento não encontrado
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
 *     description: Marca um comentário como excluído sem removê-lo fisicamente do banco de dados
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do post ao qual o comentário pertence
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário a ser excluído
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID do usuário que está realizando a ação
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: Comentário marcado como excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
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
* /posts/{id}/comments:
*  get:
*    summary: Lista os comentários de um post
*    tags:
*      - Posts
*    parameters:
*      - in: path
*        name: id
*        required: true
*        schema:
*          type: integer
*        description: ID do post
*    responses:
*      '200':
*        description: Lista de comentários
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                data:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      id:
*                        type: integer
*                      content:
*                        type: string
*                      createdAt:
*                        type: string
*                        format: date-time
*                      author:
*                        type: object
*                        properties:
*                          id:
*                            type: integer
*                          name:
*                            type: string
*                          avatarUrl:
*                            type: string
*                            nullable: true
*      '400':
*        description: ID inválido
*      '500':
*        description: Erro interno do servidor
*/
postRoutes.get(
  '/:id/comments',
  postController.listComments
);

/**
* @swagger
* /posts/comments/{id}:
*  get:
*    summary: Buscar comentário por ID
*    tags:
*      [Posts]
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
 *     summary: Marcar presença/interesse em evento
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
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [interested, confirmed]
 *                 description: Tipo de presença no evento
 *     responses:
 *       201:
 *         description: Presença registrada com sucesso
 *       400:
 *         description: Status inválido
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Post não encontrado
 */
postRoutes.post('/:id/attend', ensureAuthenticated, postController.attendEvent);

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePostRequest:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           example: "Atualizei o conteúdo do post"
 *         metadata:
 *           type: string
 *           format: json
 *           description: Metadados do post como string JSON
 *           example: '{"title": "Nova campanha", "goal": "100 agasalhos"}'
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Arquivos de imagem atualizados para o post
 */
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
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
 *         description: ID do post a ser editado
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostRequest'
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Usuário não autorizado a editar o post
 *       404:
 *         description: Post não encontrado
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
