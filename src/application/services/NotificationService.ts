// src/application/services/NotificationService.ts
import { NotificationRepository } from '../../core/repositories/NotificationRepository';
import { CreateNotificationDTO } from '../../core/dtos/notification/CreateNotificationDTO';
import { NotificationDTO } from '../../core/dtos/notification/NotificationDTO';

export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async createNotification(data: CreateNotificationDTO): Promise<void> {
    // Verifica se não é o próprio usuário (não notificar a si mesmo)
    if (data.user_id === data.actor_id) {
      return;
    }

    await this.notificationRepository.create(data);
  }

  async getNotifications(
    userId: number,
    page: number,
    limit: number
  ): Promise<NotificationDTO[]> {
    const notifications = await this.notificationRepository.findByUserId(
      userId,
      page,
      limit
    );

    // Aqui vamos converter para DTO com mensagens formatadas
    // (Vamos implementar isso depois)
    return notifications.map((notif) => this.toNotificationDTO(notif));
  }

  async getUnreadCount(userId: number): Promise<number> {
    return this.notificationRepository.countUnreadByUserId(userId);
  }

  async markAllAsRead(userId: number): Promise<void> {
    return this.notificationRepository.markAllAsRead(userId);
  }

  private toNotificationDTO(notification: any): NotificationDTO {
    // Implementação da conversão para DTO
    // (Vamos detalhar depois)
    return new NotificationDTO(
      notification.id,
      notification.type,
      notification.is_read,
      notification.created_at.toISOString(),
      {
        id: notification.actor.iduser,
        name: notification.actor.name,
        avatar_url: notification.actor.user_profile?.profile_photo || null,
      }
    );
  }
}
