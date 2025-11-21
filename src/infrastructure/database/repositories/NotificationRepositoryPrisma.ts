// src/infrastructure/database/repositories/NotificationRepositoryPrisma.ts
import { Notification } from '../../../core/entities/Notification';
import { NotificationRepository } from '../../../core/repositories/NotificationRepository';
import { CreateNotificationDTO } from '../../../core/dtos/notification/CreateNotificationDTO';
import { prisma } from '../prisma/prisma';

export class NotificationRepositoryPrisma implements NotificationRepository {
  async create(data: CreateNotificationDTO): Promise<Notification> {
    const notification = await prisma.notification.create({
      data: {
        user_id: data.user_id,
        actor_id: data.actor_id,
        type: data.type,
        post_id: data.post_id || null,
        post_share_id: data.post_share_id || null, // ✅ AGORA INCLUI POST_SHARE_ID
        comment_id: data.comment_id || null,
      },
    });

    return new Notification(
      notification.id,
      notification.user_id,
      notification.actor_id,
      notification.type,
      notification.post_id,
      notification.post_share_id,
      notification.comment_id,
      notification.is_read ?? false,
      notification.created_at || new Date()
    );
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number
  ): Promise<any[]> {
    const skip = (page - 1) * limit;

    const notifications = await prisma.notification.findMany({
      where: {
        user_id: userId,
        user_notification_actor_idTouser: {
          deletedAt: null,
        },
      },
      include: {
        user_notification_user_idTouser: {
          include: {
            user_profile: true,
          },
        },
        user_notification_actor_idTouser: {
          include: {
            user_profile: true,
          },
        },
        post: {
          include: {
            image: true,
            user: {
              include: {
                user_profile: true,
              },
            },
          },
        },
        post_share: {
          include: {
            post: {
              // ✅ INCLUI O POST ORIGINAL DO COMPARTILHAMENTO
              include: {
                image: true,
                user: {
                  include: {
                    user_profile: true,
                  },
                },
              },
            },
            user: {
              include: {
                user_profile: true,
              },
            },
          },
        },
        comment: {
          include: {
            user: {
              include: {
                user_profile: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
      skip,
      take: limit,
    });

    return notifications;
  }

  async countUnreadByUserId(userId: number): Promise<number> {
    return prisma.notification.count({
      where: {
        user_id: userId,
        is_read: false,
        user_notification_actor_idTouser: {
          deletedAt: null,
        },
      },
    });
  }

  async markAllAsRead(userId: number): Promise<void> {
    await prisma.notification.updateMany({
      where: {
        user_id: userId,
        is_read: false,
        user_notification_actor_idTouser: {
          deletedAt: null,
        },
      },
      data: { is_read: true },
    });
  }
}
