export interface GetUserPostsDTO {
  userId: number;
  requestingUserId?: number;
  page?: number;
  limit?: number;
}
