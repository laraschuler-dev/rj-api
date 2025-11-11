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

  private toDTO(notification: any): NotificationDTO {
    const actorUser =
      notification.user_notification_actor_idTouser || notification.actor;

    let message = '';
    let postPreview = undefined;

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
    if (notification.type !== 'FOLLOW' && notification.post) {
      const contentPreview =
        notification.post.content.length > 50
          ? notification.post.content.substring(0, 50) + '...'
          : notification.post.content;

      const postImage = notification.post.image?.[0]?.image;

      postPreview = {
        id: notification.post.idpost,
        content_preview: contentPreview,
        image: postImage || undefined,
      };
    }

    return new NotificationDTO(
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
  }
}
