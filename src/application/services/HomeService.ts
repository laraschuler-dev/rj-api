// application/services/HomeService.ts
import { PostRepository } from '../../core/repositories/PostRepository';
import { HomeEventDTO, HomeServiceDTO } from '../../core/dtos/HomePostDTO';

export class HomeService {
  constructor(private readonly postRepository: PostRepository) {}

  async getHomeEvents(limit: number = 6): Promise<HomeEventDTO[]> {
    const result = await this.postRepository.findByCategoryPaginated(
      8, // EVENT
      1, // page
      limit,
      undefined // userId não necessário
    );

    return result.posts.map(post => {
      const metadata = typeof post.metadata === 'string' 
        ? JSON.parse(post.metadata) 
        : post.metadata;

      return {
        id: post.id!,
        title: metadata?.title || post.content.substring(0, 50) + '...',
        image: post.images[0] || '/default-event.jpg',
        date: metadata?.date || 'Data não informada',
        location: metadata?.location || 'Local não informado',
        content: post.content
      };
    });
  }

  async getHomeServices(limit: number = 6): Promise<HomeServiceDTO[]> {
    const result = await this.postRepository.findByCategoriesPaginated(
      [5, 6, 7], // VOLUNTEER, COURSE, JOB_OFFER
      1, // page
      limit,
      undefined // userId não necessário
    );

    return result.posts.map(post => {
      const metadata = typeof post.metadata === 'string' 
        ? JSON.parse(post.metadata) 
        : post.metadata;

      return {
        id: post.id!,
        title: metadata?.title || post.content.substring(0, 50) + '...',
        image: post.images[0] || '/default-service.jpg',
        content: post.content,
        description: metadata?.description || post.content.substring(0, 100) + '...'
      };
    });
  }
}