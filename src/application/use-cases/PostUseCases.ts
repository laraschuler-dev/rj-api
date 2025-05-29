import { Post, PostMetadata } from '../../core/entities/Post';
import { PostService } from '../services/PostService';

export class PostUseCases {
  constructor(private readonly postService: PostService) {}

  async execute(
    content: string,
    categoria_idcategoria: number,
    user_iduser: number,
    metadata: PostMetadata,
    imageFilenames: string[] = []
  ): Promise<Post> {
    const post = new Post(
      null,
      content,
      categoria_idcategoria,
      user_iduser,
      metadata
    );
    (post as any).images = imageFilenames; // temporário para passar dados ao repositório
    return this.postService.createPost(post);
  }
}
