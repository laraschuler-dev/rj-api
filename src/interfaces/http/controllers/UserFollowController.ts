// src/infrastructure/controllers/UserFollowController.ts
import { Request, Response } from 'express';
import { UserFollowService } from '../../../application/services/UserFollowService';
import { CreateFollowDTO } from '../../../core/dtos/follow/CreateFollowDTO';

export class UserFollowController {
  constructor(private userFollowService: UserFollowService) {
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.getFollowers = this.getFollowers.bind(this);
    this.getFollowing = this.getFollowing.bind(this);
    this.getFollowStats = this.getFollowStats.bind(this);
    this.checkIsFollowing = this.checkIsFollowing.bind(this);
  }

  async followUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }

      const followerId = req.user.id;
      const data: CreateFollowDTO = req.body;

      const result = await this.userFollowService.followUser(followerId, data);
      res.status(201).json(result);
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || 'Erro ao seguir usuário.' });
    }
  }

  async unfollowUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }

      const followerId = req.user.id;
      const followingId = parseInt(req.params.followingId);

      if (isNaN(followingId)) {
        res.status(400).json({ message: 'ID do usuário inválido.' });
        return;
      }

      await this.userFollowService.unfollowUser(followerId, followingId);
      res
        .status(200)
        .json({ message: 'Deixou de seguir o usuário com sucesso.' });
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || 'Erro ao deixar de seguir usuário.' });
    }
  }

  async getFollowers(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const currentUserId = req.user?.id;

      if (isNaN(userId)) {
        res.status(400).json({ message: 'ID do usuário inválido.' });
        return;
      }

      const followers = await this.userFollowService.getFollowers(
        userId,
        currentUserId
      );
      res.json(followers);
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || 'Erro ao buscar seguidores.' });
    }
  }

  async getFollowing(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const currentUserId = req.user?.id;

      if (isNaN(userId)) {
        res.status(400).json({ message: 'ID do usuário inválido.' });
        return;
      }

      const following = await this.userFollowService.getFollowing(
        userId,
        currentUserId
      );
      res.json(following);
    } catch (error: any) {
      res
        .status(400)
        .json({ error: error.message || 'Erro ao buscar usuários seguidos.' });
    }
  }

  async getFollowStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const currentUserId = req.user?.id;

      if (isNaN(userId)) {
        res.status(400).json({ message: 'ID do usuário inválido.' });
        return;
      }

      const stats = await this.userFollowService.getFollowStats(
        userId,
        currentUserId
      );
      res.json(stats);
    } catch (error: any) {
      res
        .status(400)
        .json({
          error: error.message || 'Erro ao buscar estatísticas de follow.',
        });
    }
  }

  async checkIsFollowing(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }

      const followerId = req.user.id;
      const followingId = parseInt(req.params.followingId);

      if (isNaN(followingId)) {
        res.status(400).json({ message: 'ID do usuário inválido.' });
        return;
      }

      const isFollowing = await this.userFollowService.checkIsFollowing(
        followerId,
        followingId
      );
      res.json({ isFollowing });
    } catch (error: any) {
      res
        .status(400)
        .json({
          error: error.message || 'Erro ao verificar relação de follow.',
        });
    }
  }
}
