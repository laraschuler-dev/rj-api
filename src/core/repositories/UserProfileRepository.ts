import { UpdateUserProfileDTO } from '../dtos/userProfile/UpdateUserProfileDTO';

export interface UserProfileRepository {
  findByUserId(userId: number): Promise<any | null>;
  create(data: any): Promise<any>;
  update(userId: number, data: UpdateUserProfileDTO): Promise<any>;
}