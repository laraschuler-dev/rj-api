// src/infrastructure/controllers/UserSearchController.ts
import { Request, Response } from 'express';
import { UserSearchService } from '../../../application/services/UserSearchService';

export class UserSearchController {
  constructor(private userSearchService: UserSearchService) {
    this.searchUsers = this.searchUsers.bind(this);
  }

  async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const { q: searchTerm, page = 1, limit = 10 } = req.query;

      if (!searchTerm) {
        res.status(400).json({ 
          error: 'Parâmetro "q" é obrigatório' 
        });
        return;
      }

      const result = await this.userSearchService.searchUsers(
        searchTerm.toString(),
        parseInt(page as string),
        parseInt(limit as string)
      );

      res.json({
        data: {
          users: result.users
        },
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(result.totalCount / parseInt(limit as string)),
          totalCount: result.totalCount,
          hasNextPage: (parseInt(page as string) * parseInt(limit as string)) < result.totalCount
        }
      });

    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error);
      res.status(400).json({ 
        error: error.message || 'Erro ao buscar usuários' 
      });
    }
  }
}