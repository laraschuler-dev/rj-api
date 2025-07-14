import { prisma } from '../../../infrastructure/database/prisma/prisma';
import { Post, PostMetadata } from '../../../core/entities/Post';
import { PostRepository } from '../../../core/repositories/PostRepository';
import { CreateCommentDTO } from '../../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../../core/dtos/AttendEventDTO';
import { comment as Comment } from '@prisma/client';
import { post } from '@prisma/client';
/**
 * Implementação do repositório de Post utilizando Prisma ORM.
 * Responsável por persistir e recuperar posts do banco de dados.
 */
export class PostRepositoryPrisma implements PostRepository {
  /**
   * Salva um novo post no banco de dados, incluindo imagens se existirem.
   * @param post - Instância de Post a ser salva.
   * @returns O post salvo, como instância de Post.
   */
  async save(post: Post): Promise<Post> {
    const metadataString = post.metadata ? JSON.stringify(post.metadata) : null;

    const saved = await prisma.post.create({
      data: {
        content: post.content,
        categoria_idcategoria: post.categoria_idcategoria,
        user_iduser: post.user_iduser,
        metadata: metadataString,
        time: post.createdAt || new Date(),
      },
      include: { user: true },
    });

    // ✅ ADICIONADO: salva imagens na tabela `image`, se existirem
    if ((post as any).images && Array.isArray((post as any).images)) {
      const imageFilenames = (post as any).images as string[];

      const imageData = imageFilenames.map((filename) => ({
        image: filename,
        post_idpost: saved.idpost,
      }));

      await prisma.image.createMany({
        data: imageData,
      });
    }

    const metadata = saved.metadata
      ? (JSON.parse(saved.metadata) as PostMetadata)
      : {};

    return new Post(
      saved.idpost,
      saved.content,
      saved.categoria_idcategoria,
      saved.user_iduser,
      metadata,
      saved.time
    );
  }

  /**
   * Busca um post pelo seu ID.
   * @param id - Identificador do post.
   * @returns O post encontrado ou null se não existir.
   */
  async findById(id: number): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { idpost: id },
      include: { user: true },
    });

    if (!post) return null;

    const metadata = post.metadata
      ? (JSON.parse(post.metadata) as PostMetadata)
      : {};

    return new Post(
      post.idpost,
      post.content,
      post.categoria_idcategoria,
      post.user_iduser,
      metadata,
      post.time
    );
  }

  async findManyPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { time: 'desc' },
        include: {
          user: true,
          image: true,
          category: true,
        },
      }),
      prisma.post.count(),
    ]);

    return {
      posts: posts.map(
        (post) =>
          new Post(
            post.idpost,
            post.content,
            post.categoria_idcategoria,
            post.user_iduser,
            post.metadata ? JSON.parse(post.metadata) : {},
            post.time
          )
      ),
      total,
    };
  }

  async getPostByIdWithDetails(postId: number) {
    return prisma.post.findUnique({
      where: { idpost: postId },
      include: {
        user: true,
        image: true,
        user_like: true,
        comment: true,
        event_attendance: true,
      },
    });
  }

  async likePost(postId: number, userId: number): Promise<void> {
    await prisma.user_like.create({
      data: {
        post_idpost: postId,
        user_iduser: userId,
      },
    });
  }

  async unlikePost(postId: number, userId: number): Promise<void> {
    await prisma.user_like.deleteMany({
      where: {
        post_idpost: postId,
        user_iduser: userId,
      },
    });
  }

  async isPostLikedByUser(postId: number, userId: number): Promise<boolean> {
    const like = await prisma.user_like.findFirst({
      where: {
        post_idpost: postId,
        user_iduser: userId,
      },
    });
    return !!like;
  }

  async sharePost(userId: number, postId: number): Promise<void> {
    await prisma.post_share.create({
      data: {
        user_iduser: userId,
        post_idpost: postId,
      },
    });
  }

  async createComment(createCommentDTO: CreateCommentDTO): Promise<any> {
    const newComment = await prisma.comment.create({
      data: {
        comment: createCommentDTO.comment,
        post: { connect: { idpost: createCommentDTO.postId } },
        user: { connect: { iduser: createCommentDTO.userId } },
        time: createCommentDTO.time ?? new Date(),
      },
    });

    return newComment;
  }

  // src/infrastructure/database/repositories/PostRepositoryPrisma.ts
  async findCommentById(commentId: number): Promise<Comment | null> {
    return prisma.comment.findUnique({
      where: { idcomment: commentId },
    });
  }

  async updateComment(commentId: number, content: string): Promise<void> {
    await prisma.comment.update({
      where: { idcomment: commentId },
      data: { comment: content }, // corrigido aqui
    });
  }

  async attendEvent(data: AttendEventDTO): Promise<void> {
    await prisma.event_attendance.upsert({
      where: {
        user_iduser_post_idpost: {
          user_iduser: data.userId,
          post_idpost: data.postId,
        },
      },
      update: {
        status: data.status,
      },
      create: {
        user_iduser: data.userId,
        post_idpost: data.postId,
        status: data.status,
      },
    });
  }

  async findAttendance(postId: number, userId: number) {
    return await prisma.event_attendance.findUnique({
      where: {
        user_iduser_post_idpost: {
          user_iduser: userId,
          post_idpost: postId,
        },
      },
    });
  }

  async removeAttendance(postId: number, userId: number): Promise<void> {
    await prisma.event_attendance.delete({
      where: {
        user_iduser_post_idpost: {
          user_iduser: userId,
          post_idpost: postId,
        },
      },
    });
  }

  async findPostsByUser(
    userId: number,
    page: number,
    limit: number
  ): Promise<Post[]> {
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where: { user_iduser: userId },
      skip,
      take: limit,
      orderBy: { time: 'desc' },
      include: { image: true, user: true },
    });

    return posts.map(
      (post) =>
        new Post(
          post.idpost,
          post.content,
          post.categoria_idcategoria,
          post.user_iduser,
          post.metadata ? JSON.parse(post.metadata) : {},
          post.time,
          post.image.map((img) => img.image)
        )
    );
  }

  async update(postId: number, data: Partial<Post>): Promise<void> {
    await prisma.post.update({
      where: { idpost: postId },
      data: {
        content: data.content,
        metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
      },
    });

    // ✅ Atualizar imagens (se enviadas)
    if (data.images && data.images.length > 0) {
      // Remove imagens antigas (opcional, se quiser sobrescrever completamente)
      await prisma.image.deleteMany({
        where: { post_idpost: postId },
      });

      // Insere novas imagens
      await prisma.image.createMany({
        data: data.images.map((filename) => ({
          image: filename, // ✅ Nome correto da coluna segundo o Prisma
          post_idpost: postId,
        })),
      });
    }
  }

  async findImageOwner(imageId: number): Promise<{ userId: number } | null> {
    const image = await prisma.image.findUnique({
      where: { idimage: imageId },
      include: { post: true },
    });

    if (!image || !image.post) return null;

    return { userId: image.post.user_iduser };
  }

  async deleteImage(postId: number, imageId: number): Promise<void> {
    await prisma.image.delete({
      where: { idimage: imageId },
    });
  }

  async softDeleteComment(commentId: number): Promise<void> {
    await prisma.comment.update({
      where: { idcomment: commentId },
      data: {
        deleted: true, // precisa existir essa coluna
        deleted_at: new Date(), // idem
      },
    });
  }
}
