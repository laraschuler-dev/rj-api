import { prisma } from '../../../infrastructure/database/prisma/prisma';
import { Post, PostMetadata } from '../../../core/entities/Post';
import { PostRepository } from '../../../core/repositories/PostRepository';
import { CreateCommentDTO } from '../../../core/dtos/CreateCommentDTO';
import { AttendEventDTO } from '../../../core/dtos/AttendEvent/AttendEventDTO';
import { comment as Comment } from '@prisma/client';
//import { PostMapper } from '../mappers/PostMapper';
import { CommentDTO } from '@/core/dtos/ComentListDTO';
import { PostLikeDTO } from '@/core/dtos/PostLikeDTO';
import { PrismaClient, post_share } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { CommentDetailDTO } from '@/core/dtos/CommentDetailDTO';
import { GetAttendanceStatusDTO } from '@/core/dtos/AttendEvent/GetAttendanceStatusDTO';
import { AttendanceStatusResponseDTO } from '@/core/dtos/AttendEvent/AttendanceStatusResponseDTO';
type CommentWithUser = Prisma.commentGetPayload<{ include: { user: true } }>;

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
    const post = await prisma.post.findFirst({
      where: {
        idpost: id,
        deleted: false, // só retorna se não estiver deletado
      },
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

  private async findFeedItemIdsPaginated(
    page: number,
    limit: number
  ): Promise<
    {
      type: 'post' | 'share';
      id: number;
      timestamp: Date;
    }[]
  > {
    const skip = (page - 1) * limit;

    const result = await prisma.$queryRaw<
      {
        type: 'post' | 'share';
        id: number;
        timestamp: Date;
      }[]
    >`
    SELECT * FROM (
      SELECT 'post' AS type, p.idpost AS id, p.time AS timestamp
      FROM post p
      WHERE p.deleted = false

      UNION ALL

      SELECT 'share' AS type, ps.id AS id, ps.shared_at AS timestamp
      FROM post_share ps
      WHERE ps.deleted = false
    ) AS combined_feed
    ORDER BY timestamp DESC
    LIMIT ${limit} OFFSET ${skip};
  `;

    console.log(result);

    return result;
  }

  private async findPostsByIds(
    ids: number[],
    userId?: number
  ): Promise<Post[]> {
    if (ids.length === 0) return [];

    const posts = await prisma.post.findMany({
      where: { idpost: { in: ids }, deleted: false },
      include: {
        user: { include: { user_profile: true } },
        image: true,
        category: true,
        user_like: userId
          ? {
              where: {
                user_iduser: userId,
                post_share_id: null,
              },
              select: { user_iduser: true },
            }
          : false,
        event_attendance: userId
          ? {
              where: { post_share_id: null },
            }
          : true,
      },
    });

    return posts.map((post) => {
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
        liked,
        undefined,
        post.event_attendance.map((a) => ({
          userId: a.user_iduser,
          status: a.status,
        }))
      );
    });
  }

  private async findSharesByIds(
    ids: number[],
    userId?: number
  ): Promise<Post[]> {
    if (ids.length === 0) return [];

    const shares = await prisma.post_share.findMany({
      where: {
        id: { in: ids },
        deleted: false, // share válido
      },
      include: {
        user: { include: { user_profile: true } },
        user_like: userId
          ? {
              where: { user_iduser: userId, post_share_id: { not: null } },
              select: { user_iduser: true },
            }
          : false,
        post: {
          include: {
            user: { include: { user_profile: true } },
            image: true,
            category: true,
            user_like: userId
              ? {
                  where: { user_iduser: userId, post_share_id: null },
                  select: { user_iduser: true },
                }
              : false,
            event_attendance: true, // pega todos e filtra depois
          },
        },
      },
    });

    return shares.map((share: any) => {
      const p = share.post;

      // Caso o post original tenha sido deletado
      if (!p || p.deleted) {
        return new Post(
          share.id,
          '', // conteúdo vazio
          0, // categoria placeholder
          share.user_iduser,
          { isDeletedOriginal: true } as any,
          share.shared_at || new Date(),
          [],
          undefined,
          false,
          {
            id: share.user_iduser,
            shareId: share.id,
            postId: p?.idpost ?? 0, // postId placeholder
            name: share.user.name,
            avatarUrl: share.user.user_profile?.profile_photo ?? undefined,
            message: share.message || undefined,
            sharedAt: share.shared_at ? new Date(share.shared_at) : new Date(),
          },
          [] // sem eventAttendance
        );
      }

      // Post original existe
      const images = p.image.map((img: any) => img.image);
      const liked = userId ? share.user_like.length > 0 : false;
      const avatarUrl = share.user.user_profile?.profile_photo ?? undefined;

      // filtra eventAttendance só deste share
      const eventAttendance = (p.event_attendance ?? [])
        .filter((a: any) => a.post_share_id === share.id)
        .map((a: any) => ({
          userId: a.user_iduser,
          status: a.status,
        }));

      return new Post(
        share.id,
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
          shareId: share.id,
          postId: p.idpost,
          name: share.user.name,
          avatarUrl: avatarUrl,
          message: share.message || undefined,
          sharedAt: share.shared_at ? new Date(share.shared_at) : new Date(),
        },
        eventAttendance
      );
    });
  }

  async findManyPaginated(
    page: number,
    limit: number,
    userId?: number
  ): Promise<{
    posts: Post[];
    total: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
  }> {
    const feedItems = await this.findFeedItemIdsPaginated(page, limit);

    const feedItemsSafe = feedItems.map((item) => ({
      ...item,
      id: typeof item.id === 'bigint' ? Number(item.id) : item.id,
    }));

    const postIds = feedItemsSafe
      .filter((item) => item.type === 'post')
      .map((item) => item.id);

    const shareIds = feedItemsSafe
      .filter((item) => item.type === 'share')
      .map((item) => item.id);

    const [posts, shares] = await Promise.all([
      this.findPostsByIds(postIds, userId),
      this.findSharesByIds(shareIds, userId),
    ]);

    const postsMap = new Map<number, Post>();
    posts.forEach((p) => postsMap.set(p.id!, p));

    const sharesMap = new Map<number, Post>();
    shares.forEach((s) => sharesMap.set(s.id!, s));

    const allPostsWithUndefined = feedItemsSafe.map((item) => {
      if (item.type === 'post') {
        return postsMap.get(item.id);
      } else {
        return sharesMap.get(item.id);
      }
    });

    const filteredPosts: Post[] = allPostsWithUndefined.filter(
      (post): post is Post =>
        post !== undefined &&
        post.id !== null &&
        typeof post.user_iduser === 'number'
    );

    // Contagem correta: apenas posts e shares válidos
    const [totalPosts, totalShares] = await Promise.all([
      prisma.post.count({ where: { deleted: false } }),
      prisma.post_share.count({ where: { deleted: false } }),
    ]);

    const total = totalPosts + totalShares;

    return {
      posts: filteredPosts,
      total,
      currentPage: page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
    };
  }

  async getSharedPostByIdWithDetails(shareId: number) {
    const shared = await prisma.post_share.findUnique({
      where: { id: shareId },
      include: {
        post: {
          include: {
            user: {
              include: {
                user_profile: true,
              },
            },
            image: true,
          },
        },
        user: {
          include: {
            user_profile: true,
          },
        },
      },
    });

    if (!shared || !shared.post) return null;

    const originalPostId = shared.post.idpost;

    const [user_like, comment, event_attendance] = await Promise.all([
      prisma.user_like.findMany({
        where: {
          post_idpost: originalPostId,
          post_share_id: shareId,
        },
      }),
      prisma.comment.findMany({
        where: {
          post_idpost: originalPostId,
          post_share_id: shareId,
          deleted: false,
        },
      }),
      prisma.event_attendance.findMany({
        where: {
          post_idpost: originalPostId,
          post_share_id: shareId,
        },
      }),
    ]);

    const post = shared.post as any;

    post.user.avatarUrl = shared.post.user.user_profile?.profile_photo ?? null;

    post.sharedBy = {
      shareId: shared.id,
      postId: shared.post.idpost,
      id: shared.user.iduser,
      name: shared.user.name,
      avatarUrl: shared.user.user_profile?.profile_photo ?? null,
      message: shared.message,
      sharedAt: shared.shared_at ? new Date(shared.shared_at) : new Date(),
    };

    post.user_like = user_like;
    post.comment = comment;
    post.event_attendance = event_attendance;

    return post;
  }

  async getPostByIdWithDetails(postId: number) {
    const post = await prisma.post.findUnique({
      where: { idpost: postId },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
        image: true,
        user_like: true,
        comment: true,
        event_attendance: true,
      },
    });

    if (!post) return null;

    const [user_like, comment, event_attendance] = await Promise.all([
      prisma.user_like.findMany({
        where: {
          post_idpost: postId,
          post_share_id: null,
        },
      }),
      prisma.comment.findMany({
        where: {
          post_idpost: postId,
          post_share_id: null,
          deleted: false,
        },
      }),
      prisma.event_attendance.findMany({
        where: {
          post_idpost: postId,
          post_share_id: null,
        },
      }),
    ]);

    (post as any).user_like = user_like;
    (post as any).comment = comment;
    (post as any).event_attendance = event_attendance;

    return post;
  }

  async likePost(
    userId: number,
    postId: number, // deve ser obrigatório
    postShareId?: number // opcional
  ): Promise<void> {
    if (!postId) {
      throw new Error('postId é obrigatório.');
    }

    await prisma.user_like.create({
      data: {
        user_iduser: userId,
        post_idpost: postId,
        ...(postShareId ? { post_share_id: postShareId } : {}),
      },
    });
  }

  async unlikePost(
    postId: number,
    userId: number,
    postShareId?: number
  ): Promise<void> {
    await prisma.user_like.deleteMany({
      where: {
        post_idpost: postId,
        user_iduser: userId,
        ...(postShareId
          ? { post_share_id: postShareId }
          : { post_share_id: null }),
      },
    });
  }
  async isPostLikedByUser(
    postId: number,
    userId: number,
    postShareId?: number
  ): Promise<boolean> {
    const like = await prisma.user_like.findFirst({
      where: {
        post_idpost: postId,
        user_iduser: userId,
        ...(postShareId
          ? { post_share_id: postShareId }
          : { post_share_id: null }),
      },
    });
    return !!like;
  }

  async findLikesByPost(
    postId: number,
    postShareId?: number
  ): Promise<PostLikeDTO[]> {
    // Busca o share info se for post compartilhado
    let shareInfo = null;
    if (postShareId) {
      shareInfo = await prisma.post_share.findUnique({
        where: { id: postShareId },
        include: {
          user: true, // caso precise de info adicional
        },
      });
    }

    const likes = await prisma.user_like.findMany({
      where: {
        post_idpost: postId,
        ...(postShareId
          ? { post_share_id: postShareId }
          : { post_share_id: null }),
      },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
      },
    });

    // Retorna os likes sem a uniqueKey
    return likes.map((like) => ({
      id: like.user.iduser,
      name: like.user.name,
      avatarUrl: like.user.user_profile?.profile_photo ?? null,
    }));
  }

  async countLikesByPostId(
    postId: number,
    postShareId?: number
  ): Promise<number> {
    return prisma.user_like.count({
      where: {
        post_idpost: postId,
        ...(postShareId
          ? { post_share_id: postShareId }
          : { post_share_id: null }),
      },
    });
  }

  async findPostShareById(shareId: number): Promise<post_share | null> {
    return prisma.post_share.findFirst({
      where: {
        id: shareId,
        deleted: false,
      },
    });
  }

  async sharePost(userId: number, postId: number, message?: string) {
    const shared = await prisma.post_share.create({
      data: {
        user_iduser: userId,
        post_idpost: postId,
        message: message || null,
        shared_at: new Date(),
      },
    });

    const post = await prisma.post.findUnique({
      where: { idpost: postId },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
        image: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { iduser: userId },
      include: {
        user_profile: true,
      },
    });

    const fullShared = await prisma.post_share.findUnique({
      where: { id: shared.id },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
      },
    });

    return {
      shared: fullShared,
      post,
      user,
    };
  }

  async countSharesByPostId(postId: number): Promise<number> {
    const count = await prisma.post_share.count({
      where: {
        post_idpost: postId,
      },
    });

    return count;
  }

  async createComment(data: CreateCommentDTO): Promise<CommentWithUser> {
    const commentData = {
      user_iduser: data.userId,
      post_idpost: data.postId,
      post_share_id: data.shareId ?? null,
      comment: data.comment,
      time: new Date(),
    };

    return prisma.comment.create({
      data: commentData,
      include: {
        user: true,
      },
    });
  }

  async findCommentById(commentId: number): Promise<{
    idcomment: number;
    post_idpost: number;
    post_share_id: number | null;
    user_iduser: number;
  } | null> {
    return prisma.comment.findUnique({
      where: { idcomment: commentId },
      select: {
        idcomment: true,
        post_idpost: true,
        post_share_id: true,
        user_iduser: true,
      },
    });
  }

  async updateComment(commentId: number, content: string): Promise<void> {
    await prisma.comment.update({
      where: { idcomment: commentId },
      data: {
        comment: content,
        updated_at: new Date(),
      },
    });
  }

  async findCommentsByPostId(
    postId: number,
    postShareId?: number
  ): Promise<CommentDTO[]> {
    const whereClause =
      postShareId !== undefined
        ? {
            post_idpost: postId,
            post_share_id: postShareId,
            deleted: false,
          }
        : {
            post_idpost: postId,
            post_share_id: null,
            deleted: false,
          };

    const comments = await prisma.comment.findMany({
      where: whereClause,
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

  async getSingleComment(commentId: number): Promise<CommentDetailDTO | null> {
    const comment = await prisma.comment.findFirst({
      where: {
        idcomment: commentId,
        deleted: false,
      },
      include: {
        user: {
          include: {
            user_profile: true,
          },
        },
        post_share: true,
      },
    });

    if (!comment) return null;

    return {
      id: comment.idcomment,
      comment: comment.comment,
      createdAt: comment.time!,
      author: {
        id: comment.user.iduser,
        name: comment.user.name,
        avatarUrl: comment.user.user_profile?.profile_photo ?? null,
      },
    };
  }

  async countCommentsByPostId(
    postId: number,
    postShareId?: number
  ): Promise<number> {
    const whereClause =
      typeof postShareId === 'number'
        ? { post_share_id: postShareId, deleted: false }
        : { post_idpost: postId, post_share_id: null, deleted: false };

    const count = await prisma.comment.count({ where: whereClause });

    return count;
  }

  async attendEvent(data: AttendEventDTO): Promise<void> {
    const isShared =
      data.postShareId !== undefined && data.postShareId !== null;

    const existing = isShared
      ? await prisma.event_attendance.findUnique({
          where: {
            user_iduser_post_idpost_post_share_id: {
              user_iduser: data.userId,
              post_idpost: data.postId,
              post_share_id: data.postShareId!,
            },
          },
        })
      : await prisma.event_attendance.findFirst({
          where: {
            user_iduser: data.userId,
            post_idpost: data.postId,
            post_share_id: null,
          },
        });

    if (existing) {
      await prisma.event_attendance.update({
        where: { id: existing.id },
        data: { status: data.status },
      });
    } else {
      await prisma.event_attendance.create({
        data: {
          user_iduser: data.userId,
          post_idpost: data.postId,
          post_share_id: isShared ? data.postShareId! : null,
          status: data.status,
        },
      });
    }
  }

  async findAttendance(
    postId: number,
    userId: number,
    postShareId?: number | null
  ) {
    const isShared = postShareId !== undefined && postShareId !== null;

    return isShared
      ? prisma.event_attendance.findUnique({
          where: {
            user_iduser_post_idpost_post_share_id: {
              user_iduser: userId,
              post_idpost: postId,
              post_share_id: postShareId!,
            },
          },
        })
      : prisma.event_attendance.findFirst({
          where: {
            user_iduser: userId,
            post_idpost: postId,
            post_share_id: null,
          },
        });
  }

  async removeAttendance(
    postId: number,
    userId: number,
    postShareId?: number | null
  ) {
    const isShared = postShareId !== undefined && postShareId !== null;

    if (isShared) {
      await prisma.event_attendance.delete({
        where: {
          user_iduser_post_idpost_post_share_id: {
            user_iduser: userId,
            post_idpost: postId,
            post_share_id: postShareId!,
          },
        },
      });
    } else {
      await prisma.event_attendance.deleteMany({
        where: {
          user_iduser: userId,
          post_idpost: postId,
          post_share_id: null,
        },
      });
    }
  }

  async getAttendanceStatus({
    postId,
    postShareId,
    userId,
  }: GetAttendanceStatusDTO): Promise<AttendanceStatusResponseDTO> {
    if (!postId) throw new Error('postId is required');
    if (!userId) throw new Error('userId is required');

    const whereBase = {
      post_idpost: postId,
      post_share_id: postShareId ?? null,
    };

    const [userRecord, confirmedCount] = await Promise.all([
      prisma.event_attendance.findFirst({
        where: { ...whereBase, user_iduser: userId },
        select: { status: true },
      }),
      prisma.event_attendance.count({
        where: { ...whereBase, status: 'confirmed' },
      }),
    ]);

    return {
      userStatus: userRecord?.status ?? null,
      confirmedCount,
    };
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

  private async findUserFeedItemIdsPaginated(
    userId: number,
    page: number,
    limit: number
  ): Promise<{ type: 'post' | 'share'; id: number; timestamp: Date }[]> {
    const skip = (page - 1) * limit;

    return prisma.$queryRaw<
      { type: 'post' | 'share'; id: number; timestamp: Date }[]
    >`
    SELECT * FROM (
      SELECT 'post' AS type, p.idpost AS id, p.time AS timestamp
      FROM post p
      WHERE p.user_iduser = ${userId} AND p.deleted = false

      UNION ALL

      SELECT 'share' AS type, ps.id AS id, ps.shared_at AS timestamp
      FROM post_share ps
      WHERE ps.user_iduser = ${userId} AND ps.deleted = false
    ) AS combined
    ORDER BY timestamp DESC
    LIMIT ${limit} OFFSET ${skip};
  `;
  }

  async findPostsByUser(
    userId: number,
    page: number,
    limit: number
  ): Promise<{ posts: Post[]; totalCount: number }> {
    const items = await this.findUserFeedItemIdsPaginated(userId, page, limit);

    const postIds = items
      .filter((i) => i.type === 'post')
      .map((i) => Number(i.id));
    const shareIds = items
      .filter((i) => i.type === 'share')
      .map((i) => Number(i.id));

    const [posts, shares, totalPosts, totalShares] = await Promise.all([
      this.findPostsByIds(postIds, userId),
      this.findSharesByIds(shareIds, userId),
      prisma.post.count({ where: { user_iduser: userId, deleted: false } }),
      prisma.post_share.count({
        where: {
          user_iduser: userId,
          deleted: false,
          post: { deleted: false },
        },
      }),
    ]);

    const postMap = new Map(posts.map((p) => [p.id!, p]));
    const shareMap = new Map(shares.map((s) => [s.id!, s]));

    const ordered = items
      .map((i) =>
        i.type === 'post'
          ? postMap.get(Number(i.id))
          : shareMap.get(Number(i.id))
      )
      .filter((x): x is Post => !!x);

    return {
      posts: ordered,
      totalCount: totalPosts + totalShares,
    };
  }

  async update(
    postId: number,
    data: {
      content?: string;
      metadata?: Record<string, any>;
      newImages?: string[];
    }
  ): Promise<any> {
    // Atualiza conteúdo e metadata
    await prisma.post.update({
      where: { idpost: postId },
      data: {
        content: data.content,
        metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
      },
    });

    // Busca imagens atuais
    const currentImages = await prisma.image.findMany({
      where: { post_idpost: postId },
      select: { idimage: true },
    });

    const totalImages = currentImages.length;
    const newImgs = data.newImages ?? [];

    // Adiciona novas imagens
    if (newImgs.length > 0) {
      await prisma.image.createMany({
        data: newImgs.map((filename) => ({
          image: filename,
          post_idpost: postId,
        })),
      });
    }

    // Busca post atualizado com todas as relações
    return prisma.post.findUnique({
      where: { idpost: postId },
      include: {
        user: { include: { user_profile: true } },
        image: true,
        user_like: true,
        comment: true,
        event_attendance: true,
      },
    });
  }

  async updateShare(shareId: number, data: { message: string }): Promise<void> {
    await prisma.post_share.update({
      where: { id: shareId },
      data: { message: data.message },
    });
  }

  async getImagesByPostId(postId: number): Promise<{ idimage: number }[]> {
    return prisma.image.findMany({
      where: { post_idpost: postId },
      select: { idimage: true },
    });
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
    await prisma.image.deleteMany({
      where: { idimage: imageId, post_idpost: postId },
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

  async softDeleteShare(shareId: number): Promise<void> {
    await prisma.post_share.update({
      where: { id: shareId },
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
