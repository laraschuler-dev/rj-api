// EditedPostDTO.ts
import { generateUniqueKey } from '../utils/generateUniqueKey';

export class EditedPostDTO {
  static fromPrisma(post: any, userId: number) {
    return {
      uniqueKey: generateUniqueKey({ id: post.idpost }),
      id: post.idpost,
      content: post.content,
      createdAt: post.time,
      metadata:
        typeof post.metadata === 'string'
          ? JSON.parse(post.metadata)
          : post.metadata,
      categoryId: post.categoria_idcategoria,
      author: {
        id: post.user.iduser,
        name: post.user.name,
        avatarUrl: post.user.avatarUrl ?? null,
      },
      // 👇 string[]
      images: post.image.map((img: { image: string }) => img.image),
      liked: post.user_like.some(
        (like: { user_iduser: number }) => like.user_iduser === userId
      ),
      likesCount: post.user_like.length,
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
    };
  }
}
