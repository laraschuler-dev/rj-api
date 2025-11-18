import { generateUniqueKey } from '../utils/generateUniqueKey';

export class PostDetailsDTO {
  static fromPrisma(post: any, userId: number) {
    const metadata =
      typeof post.metadata === 'string'
        ? JSON.parse(post.metadata)
        : post.metadata;

    const likesCount = post.user_like?.length || 0;
    const commentsCount = post.comment?.length || 0;
    const attendanceCount = post.event_attendance?.length || 0;

    const isAnonymous = metadata?.isAnonymous === true;
    const isPostOwner = post.user.iduser === userId;
    const isShareOwner = false;

    // Aplica anonimização se necessário
    const author = isAnonymous
      ? {
          id: 0,
          name: 'Usuário Anônimo',
          avatarUrl: '/default-avatar.png',
        }
      : {
          id: post.user.iduser,
          name: post.user.name,
          avatarUrl: post.user.avatarUrl ?? null,
        };

    return {
      uniqueKey: generateUniqueKey({ id: post.idpost }),
      id: post.idpost,
      content: post.content,
      createdAt: post.time,
      metadata: metadata,
      categoryId: post.categoria_idcategoria,
      author: author,
      images: post.image.map((img: { idimage: any; image: any }) => ({
        id: img.idimage,
        url: img.image,
      })),
      // CONTAGENS ADICIONADAS
      likesCount: likesCount,
      commentsCount: commentsCount,
      attendanceCount: attendanceCount,
      sharesCount: 0,
      likedByUser: post.user_like.some(
        (like: { user_iduser: number }) => like.user_iduser === userId
      ),
      comments: post.comment.map(
        (c: { user_iduser: any; comment: any; time: any }) => ({
          userId: c.user_iduser,
          content: c.comment,
          time: c.time,
        })
      ),
      eventAttendance: post.event_attendance.map(
        (a: { user_iduser: any; status: any }) => ({
          userId: a.user_iduser,
          status: a.status,
        })
      ),
      attending: post.event_attendance.some(
        (a: { user_iduser: number }) => a.user_iduser === userId
      ),
      isPostOwner,
      isShareOwner,
    };
  }
}
