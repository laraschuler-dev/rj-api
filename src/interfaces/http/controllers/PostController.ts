import { Request, Response } from 'express';
import { CreatePostDTO } from '../../../core/dtos/CreatePostDTO';
import { PostResponseDTO } from '../../../core/dtos/PostResponseDTO';
import { PostUseCases } from '../../../application/use-cases/PostUseCases';
import { UserRepository } from '../../../core/repositories/UserRepository';
import { PostListItemDTO } from '../../../core/dtos/PostListItemDTO';
import { LikePostResponseDTO } from '../../../core/dtos/LikePostResponseDTO';
import { SharePostDTO } from '../../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '../../../core/dtos/CreateCommentDTO';
import { DeleteCommentDTO } from '../../../core/dtos/DeleteCommentDTO';
import { User } from '../../../core/entities/User';
import { Post } from '../../../core/entities/Post';
import { PostService } from '../../../application/services/PostService';
import { UserProfileRepositoryPrisma } from '@/infrastructure/database/repositories/UserProfileRepositoryPrisma';
import { UserMapper } from '../../../core/mappers/UserMapper';
import { CreatedPostDTO } from '../../../core/dtos/CreatePostResponseDTO';
import { SimpleImageService } from '../../../infrastructure/services/SimpleImageService';

/**
 * Controlador responsável por lidar com requisições relacionadas a posts.
 * Atua como intermediário entre as rotas HTTP e os casos de uso de post.
 */

export class PostController {
  postService: any;
  /**
   * Inicializa o controlador de posts.
   * @param postUseCases - Instância dos casos de uso de posts.
   * @param userRepository - Instância do repositório de usuários.
   */

  constructor(
    private readonly postUseCases: PostUseCases,
    private readonly userRepository: UserRepository,
    private userProfileRepository: UserProfileRepositoryPrisma
  ) {
    this.create = this.create.bind(this);
    this.listPosts = this.listPosts.bind(this);
    this.getById = this.getById.bind(this);
    this.like = this.like.bind(this);
    this.sharePost = this.sharePost.bind(this);
    this.commentPost = this.commentPost.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.attendEvent = this.attendEvent.bind(this);
    this.getAttendanceStatus = this.getAttendanceStatus.bind(this);
    this.getPostsByUser = this.getPostsByUser.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePostImage = this.deletePostImage.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.listComments = this.listComments.bind(this);
    this.getSingleComment = this.getSingleComment.bind(this);
    this.listLikes = this.listLikes.bind(this);
    this.getLikeCount = this.getLikeCount.bind(this);
    this.getCommentCount = this.getCommentCount.bind(this);
    this.getShareCount = this.getShareCount.bind(this);
  }

  /**
   * Cria um novo post.
   * Recebe os dados do post via requisição HTTP, valida e delega a criação ao caso de uso.
   * @param req - Objeto da requisição Express.
   * @param res - Objeto da resposta Express.
   * @returns Uma promessa que, quando resolvida, retorna a resposta HTTP.
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const categoriaId = Number(req.body.categoria_idcategoria);
      const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};

      const [error, dto] = CreatePostDTO.create({
        ...req.body,
        categoria_idcategoria: categoriaId,
        metadata,
        user_iduser: req.user.id,
        images: req.files as Express.Multer.File[],
      });

      if (error) {
        res.status(400).json({ error });
        return;
      }

      const imageFiles = req.files as Express.Multer.File[];
      const processedImages =
        await SimpleImageService.handleProductionUpload(imageFiles);

      // Criação do post
      const { post, images } = await this.postUseCases.execute(
        dto!.content,
        dto!.categoria_idcategoria,
        dto!.user_iduser,
        dto!.metadata,
        processedImages
      );

      // Busca User e UserProfile separadamente
      const author = await this.userRepository.findByIdUser(post.user_iduser);
      if (!author) {
        res.status(404).json({ error: 'Autor não encontrado' });
        return;
      }

      const profile = await this.userProfileRepository.findByUserId(author.id);

      // Usa o mapper para montar AuthorDTO
      const authorDTO = UserMapper.toAuthorDTO(author, profile ?? undefined);

      // Cria DTO final do post - passa o requestingUserId também
      const response = CreatedPostDTO.fromDomain(
        post,
        authorDTO,
        images,
        req.user.id
      );

      res.status(201).json(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      res.status(500).json({ error: errorMessage });
    }
  }

  /**
   * Retorna uma lista paginada de posts, com os seguintes campos:
   *
   * - `data`: Array de objetos com os campos do post, incluindo o autor e as imagens
   * - `page`: Número da p gina atual
   * - `limit`: Número de posts por p gina
   * - `total`: Número total de posts
   * - `totalPages`: Número total de p ginas
   *
   * Os parâmetros `page` e `limit` são opcionais e defaultam para 1 e 10, respectivamente.
   *
   * @cath {Error} Caso ocorra um erro ao buscar os posts
   */
  async listPosts(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await this.postUseCases.listPaginatedPosts(
        Number(page),
        Number(limit),
        req.user?.id
      );

      // posts já vêm como DTOs do service, com anonimato aplicado
      const postsWithUniqueKeys = result.posts;

      res.json({
        posts: postsWithUniqueKeys,
        pagination: {
          currentPage: result.currentPage,
          limit: result.limit,
          totalItems: result.total,
          totalPages: result.totalPages,
          hasNextPage: result.hasNext,
          hasPreviousPage: result.currentPage > 1,
        },
      });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar posts' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      const shareId = req.query.shareId ? Number(req.query.shareId) : null;
      const userId = req.user?.id;

      if (typeof userId !== 'number') {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }

      if (shareId) {
        const sharedPost = await this.postUseCases.getSharedPostById(
          shareId,
          userId,
          postId
        );

        if (!sharedPost) {
          res
            .status(404)
            .json({ message: 'Post compartilhado não encontrado.' });
          return;
        }

        res.json(sharedPost);
        return;
      }

      // Senão, busca o post original
      const post = await this.postUseCases.getPostById(postId, userId);

      if (!post) {
        res.status(404).json({ message: 'Post não encontrado.' });
        return;
      }

      res.json(post);
    } catch (error) {
      console.error('[PostController:getById]', error);
      res.status(500).json({ message: 'Erro ao buscar o post.' });
    }
  }

  async like(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      const shareId = req.query.shareId ? Number(req.query.shareId) : undefined;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }

      const result = await this.postUseCases.toggleLike(
        postId,
        userId,
        shareId
      );

      res.status(200).json(LikePostResponseDTO.fromResult(result.liked));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao curtir/descurtir o post.' });
    }
  }

  async listLikes(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      const shareId = req.query.shareId ? Number(req.query.shareId) : undefined;

      const likes = await this.postUseCases.listLikes(postId, shareId);

      if (likes.length === 0) {
        res.status(404).json({ error: 'Nenhuma curtida encontrada.' });
        return;
      }

      res.json({ data: likes });
    } catch (error: any) {
      console.error('Erro ao listar curtidas:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async getLikeCount(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      const shareId = req.query.shareId ? Number(req.query.shareId) : undefined;

      const result = await this.postUseCases.getLikeCount(postId, shareId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter contagem de likes.' });
    }
  }

  async sharePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { message, shareId } = req.body; // ✅ RECEBER shareId do body
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const sharePostDTO: SharePostDTO = {
        userId,
        postId: parseInt(id),
        message,
        shareId: shareId ? parseInt(shareId) : undefined, // ✅ PASSAR shareId se existir
      };

      const postItem = await this.postUseCases.sharePost(sharePostDTO);

      res.status(201).json(postItem);
    } catch (error: any) {
      console.error('Erro ao compartilhar post:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async getShareCount(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        res.status(400).json({ error: 'Parâmetro postId inválido.' });
        return;
      }

      const result = await this.postUseCases.getShareCount(postId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao contar compartilhamentos.' });
    }
  }

  async commentPost(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      const shareId = req.query.shareId ? Number(req.query.shareId) : null;
      const { comment } = req.body;
      const userId = req.user?.id;

      if (!comment || typeof comment !== 'string') {
        res.status(400).json({ error: 'Comentário inválido' });
        return;
      }

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const createCommentDTO: CreateCommentDTO = {
        userId,
        postId,
        shareId,
        comment,
      };

      const result = await this.postUseCases.commentPost(createCommentDTO);

      res.status(201).json({
        message: 'Comentário adicionado com sucesso',
      });
    } catch (error: any) {
      console.error(error);
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro ao adicionar comentário' });
      }
    }
  }

  async updateComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);
      const postShareId = req.query.postShareId
        ? Number(req.query.postShareId)
        : undefined;
      const { content } = req.body;

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      await this.postUseCases.updateComment({
        postId,
        postShareId,
        commentId,
        userId,
        content,
      });

      res.status(200).json({ message: 'Comentário atualizado com sucesso' });
    } catch (error: any) {
      console.error('Erro ao atualizar comentário:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async listComments(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      const postShareId = req.query.postShareId
        ? Number(req.query.postShareId)
        : undefined;

      if (isNaN(postId)) {
        res.status(400).json({ error: 'ID do post inválido' });
        return;
      }

      const comments = await this.postUseCases.listComments(
        postId,
        postShareId
      );

      res.status(200).json({ data: comments });
    } catch (error: any) {
      console.error('Erro ao listar comentários:', error);

      if (error.message === 'Post não encontrado') {
        res.status(404).json({ error: 'Post não encontrado' });
      } else if (error.message === 'Compartilhamento não encontrado') {
        res.status(404).json({ error: 'Compartilhamento não encontrado' });
      } else {
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    }
  }

  async getSingleComment(req: Request, res: Response): Promise<void> {
    try {
      const commentId = Number(req.params.id);

      if (isNaN(commentId)) {
        res.status(400).json({ error: 'ID do comentário inválido.' });
        return;
      }

      const comment = await this.postUseCases.getSingleComment(commentId);

      if (!comment) {
        res.status(404).json({ error: 'Comentário não encontrado' });
        return;
      }

      res.status(200).json(comment);
    } catch (error) {
      console.error('Erro ao buscar comentário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getCommentCount(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.postId);
      const postShareId = req.query.postShareId
        ? parseInt(req.query.postShareId as string)
        : undefined;

      if (isNaN(postId)) {
        res.status(400).json({ error: 'Parâmetro postId inválido.' });
        return;
      }

      const result = await this.postUseCases.getCommentCount(
        postId,
        postShareId
      );
      res.json(result);
    } catch (error: any) {
      console.error('Erro ao contar comentários:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async attendEvent(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const postId = Number(req.params.id);
      const status = req.body.status;
      const postShareId = req.query.postShareId
        ? Number(req.query.postShareId)
        : undefined;

      if (status !== 'confirmed') {
        res.status(400).json({ error: 'Status inválido' });
        return;
      }

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const result = await this.postUseCases.attendEvent({
        postId,
        userId,
        status: 'confirmed',
        postShareId,
      });

      const messages: Record<'confirmed' | 'removed', string> = {
        confirmed: 'Presença confirmada com sucesso',
        removed: 'Presença desmarcada',
      };

      res.status(201).json({ message: messages[result], status: result });
    } catch (error: any) {
      console.error('Erro ao registrar presença:', error);
      const message =
        error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  }

  async getAttendanceStatus(req: Request, res: Response): Promise<void> {
    const postId = Number(req.params.id);
    if (isNaN(postId)) {
      res.status(400).json({ error: 'postId inválido ou ausente' });
      return;
    }

    const postShareId = req.query.postShareId
      ? Number(req.query.postShareId)
      : undefined;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    const result = await this.postUseCases.getAttendanceStatus({
      postId,
      postShareId,
      userId,
    });

    res.status(200).json(result);
  }

  async getPostsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const requestingUserId = req.user?.id; // 👈 ID do usuário logado

      const result = await this.postUseCases.getPostsByUser({
        userId,
        requestingUserId, // 👈 Passa quem está solicitando
        page,
        limit,
      });

      res.status(200).json(result);
    } catch (error: any) {
      const message = error.message || 'Erro ao buscar posts';
      const status = message.includes('não encontrado') ? 404 : 400;
      res.status(status).json({ error: message });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const postId = Number(req.params.id);
      const shareId = req.query.shareId ? Number(req.query.shareId) : undefined;

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const content = req.body.content;
      const message = req.body.message;
      const metadata = req.body.metadata
        ? JSON.parse(req.body.metadata)
        : undefined;

      // ✅✅✅ CORREÇÃO AQUI - Processar novas imagens via FTP
      const imageFiles = req.files as Express.Multer.File[] | undefined;
      const processedImages = await SimpleImageService.handleProductionUpload(
        imageFiles || []
      );

      // Garantir formato correto para imagens locais
      const newImages = processedImages.map((img) =>
        !img.startsWith('http') && !img.startsWith('/uploads/')
          ? `/uploads/${img}`
          : img
      );

      // Chama o use case para atualizar
      const updated = await this.postUseCases.updatePost({
        postId: shareId ? undefined : postId,
        shareId,
        userId,
        content,
        message,
        metadata,
        newImages, // ✅ Agora processadas corretamente
      });

      res.status(200).json(updated);
    } catch (error: any) {
      console.error('❌ Erro ao atualizar post:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async deletePostImage(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.postId);
      const imageId = Number(req.params.imageId);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      await this.postUseCases.deleteImage({ postId, imageId, userId });

      res.status(200).json({ message: 'Imagem removida com sucesso' });
    } catch (error: any) {
      if (error.message.includes('não encontrada')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('não permitido')) {
        res.status(403).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { postId, commentId } = req.params;
      const postShareId = req.query.postShareId
        ? Number(req.query.postShareId)
        : undefined;

      const dto: DeleteCommentDTO = {
        commentId: Number(commentId),
        userId: Number(userId),
        postId: Number(postId),
        postShareId,
      };

      await this.postUseCases.deleteComment(dto);

      res.status(200).json({ message: 'Comentário removido com sucesso' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const postId = Number(req.params.postId);
      const shareId = req.query.shareId ? Number(req.query.shareId) : undefined;

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      await this.postUseCases.deletePost({ postId, shareId, userId });

      res.status(200).json({
        message: shareId
          ? 'Compartilhamento excluído com sucesso'
          : 'Post excluído com sucesso',
      });
    } catch (error: any) {
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('não autorizado')) {
        res.status(403).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }
}
