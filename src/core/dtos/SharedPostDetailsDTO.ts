// SharedPostDetailsDTO.ts - APENAS ESTE ARQUIVO
import { generateUniqueKey } from '../utils/generateUniqueKey';
import { UnavailablePostDTO } from './UnavailablePostDTO';

export class SharedPostDetailsDTO {
  static fromPrisma(data: any, userId: number) {
    console.log('🔍 [SharedPostDetailsDTO] Dados recebidos:', {
      temData: !!data,
      temPost: !!data?.post,
      postDeletado: data?.post?.deleted,
      temUser: !!data?.user,
      userDeletado: data?.user?.deleted,
      dataStructure: Object.keys(data || {}),
    });

    if (!data || !data.idpost || !data.sharedBy) {
      console.error('❌ [SharedPostDetailsDTO] Dados inválidos:', data);
      throw new Error('[SharedPostDetailsDTO] Dados inválidos ou ausentes.');
    }

    const metadata =
      typeof data.metadata === 'string'
        ? JSON.parse(data.metadata)
        : data.metadata;

    const likesCount = data.user_like?.length || 0;
    const commentsCount = data.comment?.length || 0;
    const attendanceCount = data.event_attendance?.length || 0;

    // 👇 DEBUG da verificação de indisponibilidade
    const shouldBeUnavailable = this.shouldBeUnavailable(data);

    if (shouldBeUnavailable) {
      console.log('🚫 [SharedPostDetailsDTO] Criando post indisponível');
      return this.createUnavailablePost(data, userId);
    }

    // 👇 SE NÃO FOR INDISPONÍVEL, processa normalmente (CÓDIGO ORIGINAL)
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
        id: isAnonymous ? 0 : data.user.iduser,
        name: isAnonymous ? 'Usuário Anônimo' : data.user.name,
        avatarUrl: isAnonymous
          ? '/default-avatar.png'
          : (data.user.avatarUrl ?? null),
      },
      images: data.image.map((img: { idimage: any; image: any }) => ({
        id: img.idimage,
        url: img.image,
      })),
      // CONTAGENS ADICIONADAS
      likesCount: likesCount,
      commentsCount: commentsCount,
      attendanceCount: attendanceCount,
      sharesCount: 0,

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
      isPostOwner,
      isShareOwner,
    };
  }

  // Verifica se o post deveria ser indisponível
  private static shouldBeUnavailable(data: any): boolean {
    // ✅ CORREÇÃO: Verifica se o post existe (tem idpost) e não está deletado
    if (!data?.idpost || data.deleted) {
      return true;
    }

    // ✅ Verifica se o autor existe e não está deletado
    if (!data.user || data.user.deleted) {
      return true;
    }

    return false;
  }

  private static createUnavailablePost(data: any, userId: number) {
    const isShareOwner = data.sharedBy.id === userId;

    // Determina o motivo da indisponibilidade
    let reason: 'ORIGINAL_POST_DELETED' | 'ORIGINAL_AUTHOR_DELETED' =
      'ORIGINAL_POST_DELETED';
    let originalAuthor = undefined;

    if (!data.user || data.user.deleted) {
      reason = 'ORIGINAL_AUTHOR_DELETED';
    } else {
      // Se o autor existe, usa suas informações
      originalAuthor = {
        id: data.user.iduser,
        name: data.user.name,
        avatarUrl: data.user.avatarUrl ?? null,
      };
    }

    const unavailableDTO =
      reason === 'ORIGINAL_POST_DELETED'
        ? UnavailablePostDTO.createForDeletedOriginal(
            data.sharedBy.shareId,
            {
              shareId: data.sharedBy.shareId,
              postId: data.sharedBy.postId,
              id: data.sharedBy.id,
              name: data.sharedBy.name,
              avatarUrl: data.sharedBy.avatarUrl,
              message: data.sharedBy.message,
              sharedAt: data.sharedBy.sharedAt.toISOString(),
            },
            originalAuthor
          )
        : UnavailablePostDTO.createForDeletedAuthor(data.sharedBy.shareId, {
            shareId: data.sharedBy.shareId,
            postId: data.sharedBy.postId,
            id: data.sharedBy.id,
            name: data.sharedBy.name,
            avatarUrl: data.sharedBy.avatarUrl,
            message: data.sharedBy.message,
            sharedAt: data.sharedBy.sharedAt.toISOString(),
          });

    return {
      uniqueKey: unavailableDTO.uniqueKey,
      id: unavailableDTO.id,
      content: 'Conteúdo indisponível',
      createdAt: unavailableDTO.sharedBy?.sharedAt || new Date().toISOString(),
      metadata: {
        isUnavailable: true,
        reason: unavailableDTO.reason,
        originalPostDeleted: unavailableDTO.reason === 'ORIGINAL_POST_DELETED',
        originalAuthorDeleted:
          unavailableDTO.reason === 'ORIGINAL_AUTHOR_DELETED',
      },
      categoryId: 0,
      author: unavailableDTO.originalAuthor
        ? {
            id: unavailableDTO.originalAuthor.id,
            name: unavailableDTO.originalAuthor.name,
            avatarUrl: unavailableDTO.originalAuthor.avatarUrl,
          }
        : {
            id: 0,
            name: 'Usuário Removido',
            avatarUrl: '/default-avatar.png',
          },
      images: [],
      likesCount: 0,
      likedByUser: false,
      comments: [],
      eventAttendance: [],
      attending: false,
      sharedBy: unavailableDTO.sharedBy,
      isPostOwner: false,
      isShareOwner: isShareOwner,
    };
  }
}
