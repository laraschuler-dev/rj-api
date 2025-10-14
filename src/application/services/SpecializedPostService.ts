// application/services/SpecializedPostService.ts
import { PostRepository } from '../../core/repositories/PostRepository';
import { UserRepository } from '../../core/repositories/UserRepository';
import { PostListItemDTO } from '../../core/dtos/PostListItemDTO';

export class SpecializedPostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getEvents(params: { page: number; limit: number; userId?: number }) {
    return this.getPostsByCategory(8, params); // EVENT
  }

  async getDonations(params: { page: number; limit: number; userId?: number }) {
    return this.getPostsByCategory(1, params); // DONATION
  }

  async getServices(params: { page: number; limit: number; userId?: number }) {
    return this.getPostsByCategories([5, 6, 7], params); // VOLUNTEER, COURSE, JOB_OFFER
  }

  private async getPostsByCategory(
    categoryId: number,
    params: { page: number; limit: number; userId?: number }
  ) {
    const { page, limit, userId } = params;
    
    const result = await this.postRepository.findByCategoryPaginated(
      categoryId,
      page,
      limit,
      userId
    );

    const postsWithDetails = await Promise.all(
      result.posts.map(async (post) => {
        const author = await this.userRepository.findByIdUser(post.user_iduser);
        if (!author) throw new Error('Autor não encontrado');

        return PostListItemDTO.fromDomain(post, author, post.images, userId);
      })
    );

    return {
      posts: postsWithDetails,
      total: result.total,
      currentPage: page,
      limit,
      totalPages: Math.ceil(result.total / limit),
      hasNext: page * limit < result.total,
    };
  }

  private async getPostsByCategories(
    categoryIds: number[],
    params: { page: number; limit: number; userId?: number }
  ) {
    const { page, limit, userId } = params;
    
    const result = await this.postRepository.findByCategoriesPaginated(
      categoryIds,
      page,
      limit,
      userId
    );

    const postsWithDetails = await Promise.all(
      result.posts.map(async (post) => {
        const author = await this.userRepository.findByIdUser(post.user_iduser);
        if (!author) throw new Error('Autor não encontrado');

        return PostListItemDTO.fromDomain(post, author, post.images, userId);
      })
    );

    return {
      posts: postsWithDetails,
      total: result.total,
      currentPage: page,
      limit,
      totalPages: Math.ceil(result.total / limit),
      hasNext: page * limit < result.total,
    };
  }
}