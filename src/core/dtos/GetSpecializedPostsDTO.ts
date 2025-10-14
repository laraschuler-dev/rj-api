// core/dtos/GetSpecializedPostsDTO.ts
export interface GetSpecializedPostsDTO {
  page?: number;
  limit?: number;
  userId?: number;
  filters?: Record<string, any>;
}
