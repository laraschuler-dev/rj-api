import { prisma } from '../../../infrastructure/database/prisma/prisma';
import { Post, PostMetadata } from '../../../core/entities/Post';
import { PostRepository } from '../../../core/repositories/PostRepository';
import { CreateCommentDTO } from '../../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../../core/dtos/AttendEventDTO';
import { comment as Comment } from '@prisma/client';
import { PostMapper } from '../mappers/PostMapper';
import { CommentDTO } from '@/core/dtos/ComentListDTO';
import { PostLikeDTO } from '@/core/dtos/PostLikeDTO';
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

  async findManyPaginated(page: number, limit: number, userId?: number) {
    const skip = (page - 1) * limit;

    const [posts, shares, totalPosts, totalShares] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { time: 'desc' },
        where: { deleted: false },
        include: {
          user: { include: { user_profile: true } },
          image: true,
          category: true,
          user_like: userId
            ? {
                where: { user_iduser: userId },
                select: { user_iduser: true },
              }
            : false,
        },
      }),

      prisma.post_share.findMany({
        skip,
        take: limit,
        orderBy: { shared_at: 'desc' },
        include: {
          user: { include: { user_profile: true } },
          post: {
            include: {
              user: { include: { user_profile: true } },
              image: true,
              category: true,
              user_like: userId
                ? {
                    where: { user_iduser: userId },
                    select: { user_iduser: true },
                  }
                : false,
            },
          },
        },
      }),

      prisma.post.count({ where: { deleted: false } }),
      prisma.post_share.count(),
    ]);

    const normalizedPosts = posts.map((post) => {
      const images = post.image.map((img) => img.image);
      const liked = userId ? post.user_like.length > 0 : false;

      return new Post(
        post.idpost,
        post.content,
        post.categoria_idcategoria,
        post.user_iduser,
        post.metadata ? JSON.parse(post.metadata) : {},
        post.time,
        images,
        post.user.user_profile?.profile_photo,
        liked
      );
    });

    const sharedPosts = shares.map((share) => {
      const p = share.post;
      const images = p.image.map((img) => img.image);
      const liked = userId ? p.user_like.length > 0 : false;
      const avatarUrl = share.user.user_profile?.profile_photo ?? undefined;

      return new Post(
        p.idpost,
        p.content,
        p.categoria_idcategoria,
        p.user_iduser,
        p.metadata ? JSON.parse(p.metadata) : {},
        p.time,
        images,
        p.user.user_profile?.profile_photo,
        liked,
        {
          id: share.user_iduser,
          name: share.user.name,
          avatarUrl: avatarUrl,
          message: share.message || undefined,
          sharedAt: share.shared_at ? new Date(share.shared_at) : new Date(), // Manter como Date
        }
      );
    });

    const allPosts = [...normalizedPosts, ...sharedPosts]
      .filter(
        (post, index, self) =>
          index ===
          self.findIndex(
            (p) =>
              p.id === post.id &&
              (!p.sharedBy ||
                p.sharedBy.sharedAt.getTime() ===
                  post.sharedBy?.sharedAt.getTime())
          )
      )
      .sort((a, b) => {
        const timeA = a.sharedBy?.sharedAt || a.createdAt;
        const timeB = b.sharedBy?.sharedAt || b.createdAt;
        return timeB.getTime() - timeA.getTime();
      });

    return {
      posts: allPosts,
      total: totalPosts + totalShares,
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

  async findLikesByPost(postId: number): Promise<PostLikeDTO[]> {
    const likes = await prisma.user_like.findMany({
      where: {
        post_idpost: postId,
      },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
      },
    });

    return likes.map((like) => ({
      id: like.user.iduser,
      name: like.user.name,
      avatarUrl: like.user.user_profile?.profile_photo ?? null,
    }));
  }

  async countLikesByPostId(postId: number): Promise<number> {
    const count = await prisma.user_like.count({
      where: {
        post_idpost: postId,
      },
    });
    return count;
  }

  async sharePost(
    userId: number,
    postId: number,
    message?: string
  ): Promise<void> {
    await prisma.post_share.create({
      data: {
        user_iduser: userId,
        post_idpost: postId,
        message: message || null,
      },
    });
  }

  async countSharesByPostId(postId: number): Promise<number> {
    const count = await prisma.post_share.count({
      where: {
        post_idpost: postId,
      },
    });

    return count;
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

  async findCommentsByPostId(postId: number): Promise<CommentDTO[]> {
    const comments = await prisma.comment.findMany({
      where: {
        post_idpost: postId,
        deleted: false,
      },
      orderBy: { time: 'asc' },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
      },
    });

    return comments.map((comment) => ({
      id: comment.idcomment,
      content: comment.comment,
      createdAt: comment.time!,
      author: {
        id: comment.user.iduser,
        name: comment.user.name,
        avatarUrl: comment.user.user_profile?.profile_photo ?? null,
      },
    }));
  }

  async getSingleComment(commentId: number): Promise<CommentDTO | null> {
    const comment = await prisma.comment.findUnique({
      where: { idcomment: commentId },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
      },
    });

    if (!comment || comment.deleted) {
      return null;
    }

    return {
      id: comment.idcomment,
      content: comment.comment,
      createdAt: comment.time!,
      author: {
        id: comment.user.iduser,
        name: comment.user.name,
        avatarUrl: comment.user.user_profile?.profile_photo ?? null,
      },
    };
  }

  async countCommentsByPostId(postId: number): Promise<number> {
    const count = await prisma.comment.count({
      where: {
        post_idpost: postId,
        deleted: false, // considera apenas os não deletados
      },
    });

    return count;
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

  async findCategoryById(id: number): Promise<{
    idcategory: number;
    nome: string;
    required_fields: string | null;
  } | null> {
    return await prisma.category.findUnique({
      where: { idcategory: id },
      select: {
        idcategory: true,
        nome: true,
        required_fields: true,
      },
    });
  }

  async findPostsByUser(
    userId: number,
    page: number,
    limit: number
  ): Promise<{
    posts: Post[];
    totalCount: number;
  }> {
    const skip = (page - 1) * limit;

    const [rawPosts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        where: { user_iduser: userId, deleted: false },
        include: { image: true },
        skip,
        take: limit,
        orderBy: { time: 'desc' },
      }),
      prisma.post.count({
        where: { user_iduser: userId, deleted: false },
      }),
    ]);

    return {
      posts: rawPosts.map(PostMapper.toDomain),
      totalCount,
    };
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

  async findImageOwner(
    imageId: number
  ): Promise<{ userId: number; postId: number } | null> {
    const image = await prisma.image.findUnique({
      where: { idimage: imageId },
      include: {
        post: {
          select: {
            user_iduser: true,
            idpost: true,
          },
        },
      },
    });

    if (!image || !image.post) return null;

    return {
      userId: image.post.user_iduser,
      postId: image.post.idpost,
    };
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

  async softDeletePost(postId: number): Promise<void> {
    await prisma.post.update({
      where: { idpost: postId },
      data: {
        deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  async findPostAuthor(postId: number): Promise<number | null> {
    const post = await prisma.post.findUnique({
      where: { idpost: postId },
      select: { user_iduser: true },
    });

    return post?.user_iduser ?? null;
  }
}
