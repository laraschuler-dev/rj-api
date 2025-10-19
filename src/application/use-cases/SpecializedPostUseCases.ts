// application/use-cases/SpecializedPostUseCases.ts
import { SpecializedPostService } from '../services/SpecializedPostService';
import { GetSpecializedPostsDTO } from '../../core/dtos/GetSpecializedPostsDTO';

export class SpecializedPostUseCases {
  constructor(private readonly specializedPostService: SpecializedPostService) {}

  async getEvents(dto: GetSpecializedPostsDTO) {
    const { page = 1, limit = 10, userId } = dto;
    return this.specializedPostService.getEvents({ page, limit, userId });
  }

  async getDonations(dto: GetSpecializedPostsDTO) {
    const { page = 1, limit = 10, userId } = dto;
    return this.specializedPostService.getDonations({ page, limit, userId });
  }

  async getServices(dto: GetSpecializedPostsDTO) {
    const { page = 1, limit = 10, userId } = dto;
    return this.specializedPostService.getServices({ page, limit, userId });
  }
}