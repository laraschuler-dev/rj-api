import { Request, Response } from 'express';
import { CreatePostDTO } from '../../../core/dtos/CreatePostDTO';
import { PostResponseDTO } from '../../../core/dtos/PostResponseDTO';
import { PostUseCases } from '../../../application/use-cases/PostUseCases';
import { UserRepository } from '../../../core/repositories/UserRepository';

export class PostController {
  constructor(
    private readonly postUseCases: PostUseCases,
    private readonly userRepository: UserRepository // 3. Injete o UserRepository
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const categoriaId = Number(req.body.categoria_idcategoria);
      const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};

      const [error, dto] = CreatePostDTO.create({
        ...req.body,
        categoria_idcategoria: categoriaId,
        metadata,
        user_iduser: req.user?.id,
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
}
