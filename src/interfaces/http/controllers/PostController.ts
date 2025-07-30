import { Request, Response } from 'express';
import { CreatePostDTO } from '../../../core/dtos/CreatePostDTO';
import { PostResponseDTO } from '../../../core/dtos/PostResponseDTO';
import { PostUseCases } from '../../../application/use-cases/PostUseCases';
import { UserRepository } from '../../../core/repositories/UserRepository';
import { PostListItemDTO } from '../../../core/dtos/PostListItemDTO';
import { LikePostResponseDTO } from '../../../core/dtos/LikePostResponseDTO';
import { SharePostDTO } from '../../../core/dtos/SharePostDTO';
import { CreateCommentDTO } from '../../../core/dtos/CreateCommentDTO';
import { DeleteCommentDTO } from '@/core/dtos/DeleteCommentDTO';
import { User } from '../../../core/entities/User';
import { Post } from '../../../core/entities/Post';
import { PostService } from '../../../application/services/PostService';

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
    private readonly userRepository: UserRepository
  ) {
    this.create = this.create.bind(this);
    this.listPosts = this.listPosts.bind(this);
    this.getById = this.getById.bind(this);
    this.like = this.like.bind(this);
    this.sharePost = this.sharePost.bind(this);
    this.commentPost = this.commentPost.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.attendEvent = this.attendEvent.bind(this);
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

      // ✅ Extrai nomes dos arquivos de imagem
      const imageFilenames = dto?.images?.map((file) => file.filename) || [];

      // ✅ Passa os nomes das imagens para o caso de uso
      const post = await this.postUseCases.execute(
        dto!.content,
        dto!.categoria_idcategoria,
        dto!.user_iduser,
        dto!.metadata,
        imageFilenames
      );

      const author = await this.userRepository.findById(post.user_iduser);
      if (!author) {
        res.status(404).json({ error: 'Autor não encontrado' });
        return;
      }

      const response = PostResponseDTO.fromDomain(post, author);
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

      const postsWithUniqueKeys = await Promise.all(
        result.posts.map(async (post) => {
          const author = await this.userRepository.findById(post.user_iduser);
          if (!author) throw new Error('Autor não encontrado');
          return PostListItemDTO.fromDomain(post, author, post.images);
        })
      );

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
      const userId = req.user?.id;

      if (isNaN(postId)) {
        res.status(400).json({ error: 'ID de post inválido.' });
        return;
      }

      if (typeof userId !== 'number') {
        res.status(400).json({ error: 'ID de usuário inválido.' });
        return;
      }

      const postDetails = await this.postUseCases.getPostById(postId, userId);

      if (!postDetails) {
        res.status(404).json({ error: 'Post não encontrado.' });
        return;
      }

      res.status(200).json(postDetails);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      res.status(500).json({ error: errorMessage });
    }
  }

  async like(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
      }
      const result = await this.postUseCases.toggleLike(postId, userId);
      res.status(200).json(LikePostResponseDTO.fromResult(result.liked));
    } catch (err) {
      res.status(500).json({ error: 'Erro ao curtir/descurtir o post.' });
    }
  }

  async listLikes(req: Request, res: Response): Promise<void> {
    try {
      const postId = Number(req.params.id);

      const likes = await this.postUseCases.listLikes(postId);

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
      const postId = parseInt(req.params.id);
      const result = await this.postUseCases.getLikeCount(postId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter contagem de likes.' });
    }
  }

  async sharePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { message } = req.body; // Recebe a mensagem do body
      const userId = req.user?.id;

      const sharePostDTO: SharePostDTO = {
        userId: 0,
        postId: parseInt(id),
        message,
      };

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
      } else {
        sharePostDTO.userId = userId;
        await this.postUseCases.sharePost(sharePostDTO);
        res.status(201).json({ message: 'Post compartilhado com sucesso' });
      }
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
      const { id } = req.params;
      const { comment } = req.body;
      const { target = 'post' } = req.query; // padrão: post
      const userId = req.user?.id;

      if (!['post', 'share'].includes(target as string)) {
        res
          .status(400)
          .json({ error: 'Tipo de alvo inválido. Use "post" ou "share".' });
        return;
      }

      const createCommentDTO: CreateCommentDTO = {
        userId: userId ?? 0,
        targetId: parseInt(id),
        comment,
        targetType: target as 'post' | 'share',
      };

      if (userId === undefined) {
        res.status(401).json({ error: 'Usuário não autenticado' });
      } else {
        await this.postUseCases.commentPost(createCommentDTO, userId);
        res.status(201).json({ message: 'Comentário adicionado com sucesso' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar comentário' });
    }
  }

  async updateComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const postId = Number(req.params.postId);
      const commentId = Number(req.params.commentId);
      const { content } = req.body;

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      await this.postUseCases.updateComment({
        postId,
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

      if (isNaN(postId)) {
        res.status(400).json({ error: 'ID do post inválido' });
        return;
      }

      const comments = await this.postUseCases.listComments(postId);

      res.status(200).json({ data: comments });
    } catch (error) {
      console.error('Erro ao listar comentários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getSingleComment(req: Request, res: Response): Promise<void> {
    try {
      const commentId = Number(req.params.id);
      if (isNaN(commentId)) {
        res.status(400).json({ error: 'ID inválido' });
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
      const postId = parseInt(req.params.id);
      if (isNaN(postId)) {
        res.status(400).json({ error: 'Parâmetro postId inválido.' });
        return;
      }

      const result = await this.postUseCases.getCommentCount(postId);
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
      const { status } = req.body;

      if (!['interested', 'confirmed'].includes(status)) {
        res.status(400).json({ error: 'Status inválido' });
      }

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const result = await this.postUseCases.attendEvent({
        postId,
        userId,
        status,
      });

      const messages = {
        interested: 'Interesse registrado com sucesso',
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

  async getPostsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await this.postUseCases.getPostsByUser({
        userId,
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

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const content = req.body.content;
      const metadata = req.body.metadata
        ? JSON.parse(req.body.metadata)
        : undefined;

      const imageFiles = req.files as Express.Multer.File[] | undefined;
      const imageFilenames = imageFiles?.map((file) => file.filename) || [];

      await this.postUseCases.updatePost({
        postId,
        userId,
        content,
        metadata,
        images: imageFilenames.length > 0 ? imageFilenames : undefined, // só envia se tiver imagens
      });

      res.status(200).json({ message: 'Post atualizado com sucesso' });
    } catch (error: any) {
      console.error('Erro ao atualizar post:', error);
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
      res.status(400).json({ error: error.message });
    }
  }

  async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { postId, commentId } = req.params;

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const dto: DeleteCommentDTO = {
        commentId: Number(commentId),
        userId: Number(userId),
        postId: Number(postId), // Agora incluímos o postId no DTO
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

      if (!userId) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      await this.postUseCases.deletePost({ postId, userId });

      res.status(200).json({ message: 'Post excluído com sucesso' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
