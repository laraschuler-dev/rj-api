// interfaces/controllers/SpecializedPostController.ts
import { Request, Response } from 'express';
import { SpecializedPostUseCases } from '../../../application/use-cases/SpecializedPostUseCases';

export class SpecializedPostController {
  constructor(private readonly specializedPostUseCases: SpecializedPostUseCases) {
    this.getEvents = this.getEvents.bind(this);
    this.getDonations = this.getDonations.bind(this);
    this.getServices = this.getServices.bind(this);
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const userId = req.user?.id;

      const result = await this.specializedPostUseCases.getEvents({
        page: Number(page),
        limit: Number(limit),
        userId,
      });

      res.json({
        posts: result.posts,
        pagination: {
          currentPage: result.currentPage,
          limit: result.limit,
          totalItems: result.total,
          totalPages: result.totalPages,
          hasNextPage: result.hasNext,
          hasPreviousPage: result.currentPage > 1,
        },
      });
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }

  async getDonations(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const userId = req.user?.id;

      const result = await this.specializedPostUseCases.getDonations({
        page: Number(page),
        limit: Number(limit),
        userId,
      });

      res.json({
        posts: result.posts,
        pagination: {
          currentPage: result.currentPage,
          limit: result.limit,
          totalItems: result.total,
          totalPages: result.totalPages,
          hasNextPage: result.hasNext,
          hasPreviousPage: result.currentPage > 1,
        },
      });
    } catch (err) {
      console.error('Erro ao buscar doações:', err);
      res.status(500).json({ error: 'Erro ao buscar doações' });
    }
  }

  async getServices(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const userId = req.user?.id;

      const result = await this.specializedPostUseCases.getServices({
        page: Number(page),
        limit: Number(limit),
        userId,
      });

      res.json({
        posts: result.posts,
        pagination: {
          currentPage: result.currentPage,
          limit: result.limit,
          totalItems: result.total,
          totalPages: result.totalPages,
          hasNextPage: result.hasNext,
          hasPreviousPage: result.currentPage > 1,
        },
      });
    } catch (err) {
      console.error('Erro ao buscar serviços:', err);
      res.status(500).json({ error: 'Erro ao buscar serviços' });
    }
  }
}