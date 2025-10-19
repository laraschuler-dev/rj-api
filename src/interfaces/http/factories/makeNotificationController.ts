// src/infrastructure/express/factories/makeNotificationController.ts
import { NotificationRepositoryPrisma } from '../../../infrastructure/database/repositories/NotificationRepositoryPrisma';
import { GetNotificationsUseCase } from '../../../application/use-cases/notification/GetNotificationsUseCase';
import { MarkNotificationsAsReadUseCase } from '../../../application/use-cases/notification/MarkNotificationsAsReadUseCase';
import { GetUnreadCountUseCase } from '../../../application/use-cases/notification/GetUnreadCountUseCase';
import { NotificationController } from '../controllers/NotificationController';

export function makeNotificationController(): NotificationController {
  const notificationRepository = new NotificationRepositoryPrisma();

  const getNotificationsUseCase = new GetNotificationsUseCase(
    notificationRepository
  );
  const markAsReadUseCase = new MarkNotificationsAsReadUseCase(
    notificationRepository
  );
  const getUnreadCountUseCase = new GetUnreadCountUseCase(
    notificationRepository
  );

  return new NotificationController(
    getNotificationsUseCase,
    markAsReadUseCase,
    getUnreadCountUseCase
  );
}
