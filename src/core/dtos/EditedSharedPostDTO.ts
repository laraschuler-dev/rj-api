// EditedSharedPostDTO.ts
import { generateUniqueKey } from '../utils/generateUniqueKey';
import { ContentValidationService } from '../../application/services/ContentValidationService'; // 👈 Adicione esta importação
import { UnavailablePostDTO } from '../../core/dtos/UnavailablePostDTO'; // 👈 E esta

export class EditedSharedPostDTO {
  static fromPrisma(data: any, userId: number) {
    if (!data || !data.idpost || !data.sharedBy) {
      throw new Error('[EditedSharedPostDTO] Dados inválidos ou ausentes.');
    }

    const metadata =
      typeof data.metadata === 'string'
        ? JSON.parse(data.metadata)
        : data.metadata;

    // 👇 PRIMEIRO: Verifica se o post deveria ser indisponível
    const shouldBeUnavailable = this.shouldBeUnavailable(data, metadata);

    if (shouldBeUnavailable) {
      return this.createUnavailablePost(data, userId);
    }

    // 👇 SE NÃO FOR INDISPONÍVEL, processa normalmente
    const isAnonymous = metadata?.isAnonymous === true;
    const isPostOwner = data.user.iduser === userId;
    const isShareOwner = data.sharedBy.id === userId;

    // ✅ CORREÇÃO: Normalização do avatar do autor
    const authorAvatarUrl =
      data.user.user_profile?.profile_photo ?? data.user.avatarUrl ?? null;

    const author = isAnonymous
      ? {
          id: 0,
          name: 'Usuário Anônimo',
          avatarUrl: '/default-avatar.png',
        }
      : {
          id: data.user.iduser,
          name: data.user.name,
          avatarUrl: authorAvatarUrl, // ✅ Usa a URL normalizada
        };

    // ✅ CORREÇÃO: Normalização do avatar do compartilhador
    const sharedByAvatarUrl =
      data.sharedBy.user_profile?.profile_photo ??
      data.sharedBy.avatarUrl ??
      null;

    const uniqueKey = generateUniqueKey({
      id: data.idpost,
      sharedBy: {
        id: data.sharedBy.id,
        shareId: data.sharedBy.shareId,
        sharedAt: data.sharedBy.sharedAt,
      },
    });

    return {
      uniqueKey,
      id: data.idpost,
      content: data.content,
      createdAt: data.time,
      metadata,
      categoryId: data.categoria_idcategoria,
      author: author,
      images: data.image.map((img: { image: string }) => img.image),
      liked: data.user_like.some(
        (like: { user_iduser: number }) => like.user_iduser === userId
      ),
      likesCount: data.user_like.length,
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
        avatarUrl: sharedByAvatarUrl, // ✅ Avatar normalizado do compartilhador
        message: data.sharedBy.message,
        sharedAt: data.sharedBy.sharedAt,
      },
      isPostOwner,
      isShareOwner,
    };
  }

  // 👇 NOVO MÉTODO: Verifica se o post deveria ser indisponível
  // EditedSharedPostDTO.ts
  private static shouldBeUnavailable(data: any, metadata: any): boolean {
    console.log('🔍 [EditedSharedPostDTO] Verificando disponibilidade:', {
      temIdpost: !!data?.idpost,
      idpost: data?.idpost,
      temUser: !!data?.user,
      userDeletado: data?.user?.deleted,
      dataDeleted: data?.deleted,
      dataStructure: Object.keys(data || {}),
    });

    // ✅ CORREÇÃO: A estrutura não tem propriedade 'post', verifica diretamente
    // data já É o post original com propriedades no nível raiz
    if (!data?.idpost || data.deleted) {
      console.log('❌ [EditedSharedPostDTO] Post original indisponível');
      return true;
    }

    // ✅ CORREÇÃO: Verifica se o autor original existe e não está deletado
    if (!data.user || data.user.deleted) {
      console.log('❌ [EditedSharedPostDTO] Autor original indisponível');
      return true;
    }

    console.log('✅ [EditedSharedPostDTO] Post disponível para edição');
    return false;
  }

  // 👇 NOVO MÉTODO: Cria DTO para post indisponível
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

    return {
      uniqueKey: `unavailable:${data.sharedBy.shareId}`,
      id: data.sharedBy.shareId,
      content: 'Conteúdo indisponível',
      categoria_idcategoria: 0,
      user: originalAuthor
        ? {
            id: originalAuthor.id,
            name: originalAuthor.name,
            avatarUrl: originalAuthor.avatarUrl,
          }
        : {
            id: 0,
            name: 'Usuário Removido',
            avatarUrl: '/default-avatar.png',
          },
      metadata: {
        isUnavailable: true,
        reason,
        originalPostDeleted: reason === 'ORIGINAL_POST_DELETED',
        originalAuthorDeleted: reason === 'ORIGINAL_AUTHOR_DELETED',
      },
      images: [],
      createdAt: data.sharedBy.sharedAt,
      liked: false,
      isPostOwner: false,
      isShareOwner: isShareOwner,
      sharedBy: {
        shareId: data.sharedBy.shareId,
        postId: data.sharedBy.postId,
        id: data.sharedBy.id,
        name: data.sharedBy.name,
        avatarUrl: data.sharedBy.avatarUrl ?? null,
        message: data.sharedBy.message,
        sharedAt: data.sharedBy.sharedAt,
      },
      eventAttendance: [],
      attending: false,
    };
  }
}
