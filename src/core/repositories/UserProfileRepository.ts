import { UpdateUserProfileDTO } from '../dtos/userProfile/UpdateUserProfileDTO';
import { UserProfile } from '../entities/UserProfile';

export interface UserProfileRepository {
  findByUserId(userId: number): Promise<UserProfile | null>;
  create(data: any): Promise<any>;
  update(userId: number, data: UpdateUserProfileDTO): Promise<any>;
}