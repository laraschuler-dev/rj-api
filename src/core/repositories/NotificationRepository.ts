// src/core/repositories/NotificationRepository.ts
import { Notification } from "../entities/Notification";
import { CreateNotificationDTO } from "../dtos/notification/CreateNotificationDTO";

export interface NotificationRepository {
  create(data: CreateNotificationDTO): Promise<Notification>;
  findByUserId(userId: number, page: number, limit: number): Promise<Notification[]>;
  countUnreadByUserId(userId: number): Promise<number>;
  markAllAsRead(userId: number): Promise<void>;
}