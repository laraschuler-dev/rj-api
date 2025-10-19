// src/infrastructure/express/controllers/NotificationController.ts
import { Request, Response } from 'express';
import { GetNotificationsUseCase } from '../../../application/use-cases/notification/GetNotificationsUseCase';
import { MarkNotificationsAsReadUseCase } from '../../../application/use-cases/notification/MarkNotificationsAsReadUseCase';
import { GetUnreadCountUseCase } from '../../../application/use-cases/notification/GetUnreadCountUseCase';

export class NotificationController {
  constructor(
    private readonly getNotificationsUseCase: GetNotificationsUseCase,
    private readonly markAsReadUseCase: MarkNotificationsAsReadUseCase,
    private readonly getUnreadCountUseCase: GetUnreadCountUseCase
  ) {
    this.getNotifications = this.getNotifications.bind(this);
    this.getUnreadCount = this.getUnreadCount.bind(this);
  }

  async getNotifications(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
      }

      const userId = req.user.id;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;

      // 1. Busca as notificações
      const notifications = await this.getNotificationsUseCase.execute(
        userId,
        page,
        limit
      );

      // 2. Marca TODAS como lidas (conforme seu requisito)
      await this.markAsReadUseCase.execute(userId);

      res.json({
        data: notifications,
        pagination: {
          currentPage: page,
          limit,
          hasNextPage: notifications.length === limit,
        },
      });
    } catch (error: any) {
      console.error('Erro ao buscar notificações:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async getUnreadCount(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
      }

      const userId = req.user.id;
      const count = await this.getUnreadCountUseCase.execute(userId);

      res.json({ count });
    } catch (error: any) {
      console.error('Erro ao buscar contador de notificações:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
