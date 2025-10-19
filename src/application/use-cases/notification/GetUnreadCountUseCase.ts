// src/application/use-cases/notification/GetUnreadCountUseCase.ts
import { NotificationRepository } from "../../../core/repositories/NotificationRepository";
export class GetUnreadCountUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(userId: number): Promise<number> {
    return this.notificationRepository.countUnreadByUserId(userId);
  }
}
