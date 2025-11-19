// src/application/use-cases/notification/GetNotificationsUseCase.ts
import { NotificationDTO } from '../../../core/dtos/notification/NotificationDTO';
import { NotificationRepository } from '../../../core/repositories/NotificationRepository';

export class GetNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(
    userId: number,
    page: number,
    limit: number
  ): Promise<NotificationDTO[]> {
    const notifications = await this.notificationRepository.findByUserId(
      userId,
      page,
      limit
    );

    return notifications.map((notif) => this.toDTO(notif));
  }

  // GetNotificationsUseCase.ts - Vamos adicionar logs de debug
  private toDTO(notification: any): NotificationDTO {
    console.log('🔍 NOTIFICATION RAW DATA:', {
      id: notification.id,
      type: notification.type,
      post_id: notification.post_id,
      post_share_id: notification.post_share_id, // ← VERIFICAR ESTE VALOR
      hasPost: !!notification.post,
      hasPostShare: !!notification.post_share,
    });

    const actorUser =
      notification.user_notification_actor_idTouser || notification.actor;

    let message = '';
    let postPreview = undefined;
    let commentId = undefined;

    if (actorUser) {
      switch (notification.type) {
        case 'FOLLOW':
          message = `começou a seguir você`;
          break;
        case 'LIKE':
          message = `curtiu seu post`;
          break;
        case 'COMMENT':
          message = `comentou no seu post`;
          break;
        case 'EVENT_ATTENDANCE':
          message = `confirmou presença no seu evento`;
          break;
        case 'SHARE':
          message = `compartilhou seu post`;
          break;
        default:
          message = 'Nova notificação';
      }
    } else {
      message = 'Alguém interagiu com você';
    }

    // ✅ SÓ MOSTRAR PREVIEW DO POST SE EXISTIR E NÃO FOR FOLLOW
    if (
      notification.type !== 'FOLLOW' &&
      (notification.post || notification.post_share)
    ) {
      const isShare = !!notification.post_share_id;

      console.log('📊 DETECTED SHARE NOTIFICATION:', {
        type: notification.type,
        post_share_id: notification.post_share_id,
        isShare: isShare,
      });

      // ✅ PARA SHARES: Sempre usar o post_share_id da notificação
      let shareIdToReturn: number | undefined = undefined;
      let targetPostId: number | null = notification.post_id;

      if (notification.type === 'SHARE') {
        // Notificação de SHARE sempre referencia o compartilhamento específico
        shareIdToReturn = notification.post_share_id || undefined;
        console.log(
          '🔄 SHARE NOTIFICATION - shareIdToReturn:',
          shareIdToReturn
        );
      } else {
        // Para outros tipos (LIKE, COMMENT), manter lógica normal
        shareIdToReturn = isShare ? notification.post_share_id : undefined;
      }

      // ✅ DETERMINAR QUAL CONTEÚDO MOSTRAR
      let contentPreview = 'Post';
      let postImage: string | undefined = undefined;

      if (notification.type === 'SHARE' && notification.post_share) {
        // Para notificações de SHARE, mostrar o conteúdo do compartilhamento
        const shareMessage = notification.post_share.message;
        contentPreview = shareMessage
          ? shareMessage.length > 50
            ? shareMessage.substring(0, 50) + '...'
            : shareMessage
          : 'Compartilhou seu post';

        // Tentar pegar imagem do post original compartilhado
        postImage = notification.post_share.post?.image?.[0]?.image;
      } else {
        // Para outros tipos, mostrar conteúdo do post
        const targetPost = isShare
          ? notification.post_share?.post
          : notification.post;
        contentPreview = targetPost?.content
          ? targetPost.content.length > 50
            ? targetPost.content.substring(0, 50) + '...'
            : targetPost.content
          : 'Post';
        postImage = targetPost?.image?.[0]?.image;
      }

      // ✅ INCLUI comment_id SE FOR NOTIFICAÇÃO DE COMMENT
      if (notification.type === 'COMMENT' && notification.comment_id) {
        commentId = notification.comment_id;
      }

      postPreview = {
        id: targetPostId,
        share_id: shareIdToReturn,
        content_preview: contentPreview,
        image: postImage || undefined,
        comment_id: commentId,
      };
    }

    const result = new NotificationDTO(
      notification.id,
      notification.type,
      notification.is_read,
      notification.created_at.toISOString(),
      {
        id: actorUser?.iduser || notification.actor_id || 0,
        name: actorUser?.name || 'Usuário',
        avatar_url: actorUser?.user_profile?.profile_photo || null,
      },
      postPreview,
      message
    );

    console.log('🎉 FINAL NOTIFICATION DTO:', {
      id: result.id,
      type: result.type,
      post: result.post,
    });

    return result;
  }
}
