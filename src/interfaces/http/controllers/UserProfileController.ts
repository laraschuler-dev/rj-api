import { Request, Response } from 'express';
import { UserProfileService } from '../../../application/services/UserProfileService';
import { UpdateUserProfileDTO } from '../../../core/dtos/userProfile/UpdateUserProfileDTO';
import { SimpleImageService } from '../../../infrastructure/services/SimpleImageService';

export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updateProfilePhoto = this.updateProfilePhoto.bind(this);
    this.getPublicProfile = this.getPublicProfile.bind(this);
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

  async getPublicProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);

      if (isNaN(userId)) {
        res.status(400).json({ message: 'ID do usuário inválido.' });
        return;
      }

      const publicProfile =
        await this.userProfileService.getPublicProfile(userId);

      if (!publicProfile) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      // ✅ Log para debug - verifique se o ID está presente
      console.log('Public Profile Response:', {
        id: publicProfile.id,
        name: publicProfile.name,
        profile: publicProfile.profile,
      });

      res.json(publicProfile);
    } catch (err: any) {
      res
        .status(400)
        .json({ error: err.message || 'Erro ao buscar perfil público.' });
    }
  }
  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }
      const userId = req.user.id;

      let profile_photo = req.body.profile_photo;
      if (req.file) {
        const processedImages = await SimpleImageService.handleProductionUpload(
          [req.file]
        );
        profile_photo = processedImages[0];

        if (
          !profile_photo.startsWith('http') &&
          !profile_photo.startsWith('/uploads/')
        ) {
          profile_photo = `/uploads/${profile_photo}`;
        }
      }

      const dto: UpdateUserProfileDTO = {
        profile_type: req.body.profile_type,
        profile_photo: profile_photo,
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
      console.error('❌ Erro ao atualizar perfil:', err);
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

      const processedImages = await SimpleImageService.handleProductionUpload([
        req.file,
      ]);

      let profile_photo = processedImages[0];

      if (
        !profile_photo.startsWith('http') &&
        !profile_photo.startsWith('/uploads/')
      ) {
        profile_photo = `/uploads/${profile_photo}`;
      }

      const updatedProfile = await this.userProfileService.updateProfile(
        userId,
        { profile_photo }
      );

      res.json(updatedProfile);
    } catch (err: any) {
      console.error('❌ Erro ao atualizar foto de perfil:', err);
      res
        .status(400)
        .json({ error: err.message || 'Erro ao atualizar foto de perfil.' });
    }
  }
}
