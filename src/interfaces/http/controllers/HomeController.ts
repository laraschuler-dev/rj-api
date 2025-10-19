// interfaces/controllers/HomeController.ts
import { Request, Response } from 'express';
import { HomeService } from '../../../application/services/HomeService';

export class HomeController {
  constructor(private readonly homeService: HomeService) {
    this.getHomeEvents = this.getHomeEvents.bind(this);
    this.getHomeServices = this.getHomeServices.bind(this);
  }

  async getHomeEvents(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 6 } = req.query;
      
      const events = await this.homeService.getHomeEvents(Number(limit));
      
      res.json({ events });
    } catch (err) {
      console.error('Erro ao buscar eventos da home:', err);
      res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }

  async getHomeServices(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 6 } = req.query;
      
      const services = await this.homeService.getHomeServices(Number(limit));
      
      res.json({ services });
    } catch (err) {
      console.error('Erro ao buscar serviços da home:', err);
      res.status(500).json({ error: 'Erro ao buscar serviços' });
    }
  }
}