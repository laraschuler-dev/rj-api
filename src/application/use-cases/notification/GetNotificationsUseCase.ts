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
          message = `${actorUser.name} começou a seguir você`;
          break;
        case 'LIKE':
          message = `${actorUser.name} curtiu seu post`;
          break;
        case 'COMMENT':
          message = `${actorUser.name} comentou no seu post`;
          break;
        case 'EVENT_ATTENDANCE':
          message = `${actorUser.name} confirmou presença no seu evento`;
          break;
        case 'SHARE':
          message = `${actorUser.name} compartilhou seu post`;
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
      console.log(
        '📊 IS_SHARE:',
        isShare,
        'POST_SHARE_ID:',
        notification.post_share_id
      );

      const targetPost = isShare
        ? notification.post_share?.post
        : notification.post;

      const contentPreview = targetPost?.content
        ? targetPost.content.length > 50
          ? targetPost.content.substring(0, 50) + '...'
          : targetPost.content
        : 'Post';

      const postImage = targetPost?.image?.[0]?.image;

      // ✅ LÓGICA PARA SHARE_ID - VAMOS DEBUGAR
      let shareIdToReturn: number | undefined = undefined;

      console.log('🎯 BEFORE SHARE_ID LOGIC:', {
        type: notification.type,
        post_share_id: notification.post_share_id,
        isShare: isShare,
      });

      // PARA NOTIFICAÇÕES DE SHARE, SEMPRE RETORNA post_share_id DA NOTIFICAÇÃO
      if (notification.type === 'SHARE') {
        shareIdToReturn = notification.post_share_id || undefined;
        console.log(
          '🔄 SHARE NOTIFICATION - shareIdToReturn:',
          shareIdToReturn
        );
      } else {
        // Para outros tipos, lógica normal
        shareIdToReturn = isShare ? notification.post_share_id : undefined;
        console.log(
          '🔄 OTHER NOTIFICATION - shareIdToReturn:',
          shareIdToReturn
        );
      }

      console.log('✅ FINAL shareIdToReturn:', shareIdToReturn);

      // ✅ INCLUI comment_id SE FOR NOTIFICAÇÃO DE COMMENT
      if (notification.type === 'COMMENT' && notification.comment_id) {
        commentId = notification.comment_id;
      }

      postPreview = {
        id: targetPost?.idpost || notification.post_id,
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
