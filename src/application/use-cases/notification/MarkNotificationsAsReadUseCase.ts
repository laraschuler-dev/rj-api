// src/application/use-cases/notification/MarkNotificationsAsReadUseCase.ts
import { NotificationRepository } from "../../../core/repositories/NotificationRepository";
export class MarkNotificationsAsReadUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(userId: number): Promise<void> {
    return this.notificationRepository.markAllAsRead(userId);
  }
}
