import { Request, Response } from 'express';
import { UserProfileService } from '../../../application/services/UserProfileService';
import { UpdateUserProfileDTO } from '../../../core/dtos/userProfile/UpdateUserProfileDTO';

export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updateProfilePhoto = this.updateProfilePhoto.bind(this);
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }
      const userId = req.user.id;
      const profileData = await this.userProfileService.getProfile(userId);
      if (!profileData) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }
      res.json(profileData);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Erro ao buscar perfil.' });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }
      const userId = req.user.id;
      const dto: UpdateUserProfileDTO = {
        profile_type: req.body.profile_type,
        profile_photo: req.body.profile_photo,
        bio: req.body.bio,
        city: req.body.city,
        state: req.body.state,
      };
      const updatedProfile = await this.userProfileService.updateProfile(
        userId,
        dto
      );
      res.json(updatedProfile);
    } catch (err: any) {
      res
        .status(400)
        .json({ error: err.message || 'Erro ao atualizar perfil.' });
    }
  }

  async updateProfilePhoto(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }
      if (!req.file) {
        res.status(400).json({ message: 'Nenhuma imagem enviada.' });
        return;
      }
      const userId = req.user.id;
      const profile_photo = `/uploads/${req.file.filename}`;
      const updatedProfile = await this.userProfileService.updateProfile(
        userId,
        { profile_photo }
      );
      res.json(updatedProfile);
    } catch (err: any) {
      res
        .status(400)
        .json({ error: err.message || 'Erro ao atualizar foto de perfil.' });
    }
  }
}
