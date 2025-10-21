import { generateUniqueKey } from '../utils/generateUniqueKey';

export class SharedPostDetailsDTO {
  static fromPrisma(data: any, userId: number) {
    if (!data || !data.idpost || !data.sharedBy) {
      throw new Error('[SharedPostDetailsDTO] Dados inválidos ou ausentes.');
    }

    const metadata =
      typeof data.metadata === 'string'
        ? JSON.parse(data.metadata)
        : data.metadata;

    const isAnonymous = metadata?.isAnonymous === true;
    const isPostOwner = data.user.iduser === userId;
    const isShareOwner = data.sharedBy.id === userId;

    return {
      uniqueKey: generateUniqueKey({
        id: data.idpost,
        sharedBy: {
          id: data.sharedBy.id,
          shareId: data.sharedBy.shareId,
          sharedAt: data.sharedBy.sharedAt,
        },
      }),
      id: data.idpost,
      content: data.content,
      createdAt: data.time,
      metadata,
      categoryId: data.categoria_idcategoria,
      author: {
        id: isAnonymous ? 0 : data.user.iduser, // 👈 Anonimização
        name: isAnonymous ? 'Usuário Anônimo' : data.user.name,
        avatarUrl: isAnonymous
          ? '/default-avatar.png'
          : (data.user.avatarUrl ?? null),
      },
      images: data.image.map((img: { idimage: any; image: any }) => ({
        id: img.idimage,
        url: img.image,
      })),
      likesCount: data.user_like.length,
      likedByUser: data.user_like.some(
        (like: { user_iduser: number }) => like.user_iduser === userId
      ),
      comments: data.comment.map(
        (c: { user_iduser: any; comment: any; time: any }) => ({
          userId: c.user_iduser,
          content: c.comment,
          time: c.time,
        })
      ),
      eventAttendance: data.event_attendance.map(
        (a: { user_iduser: any; status: any }) => ({
          userId: a.user_iduser,
          status: a.status,
        })
      ),
      attending: data.event_attendance.some(
        (a: { user_iduser: number }) => a.user_iduser === userId
      ),
      sharedBy: {
        shareId: data.sharedBy.shareId,
        postId: data.sharedBy.postId,
        id: data.sharedBy.id,
        name: data.sharedBy.name,
        avatarUrl: data.sharedBy.avatarUrl ?? null,
        message: data.sharedBy.message,
        sharedAt: data.sharedBy.sharedAt,
      },
      isPostOwner, // 👈 NOVO
      isShareOwner, // 👈 NOVO
    };
  }
}
