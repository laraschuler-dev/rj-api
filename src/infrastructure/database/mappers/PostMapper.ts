import { Prisma } from '@prisma/client';
import { Post, PostMetadata } from '../../../core/entities/Post';

export class PostMapper {
  static toDomain(
    raw: Prisma.postGetPayload<{ include: { image: true } }>
  ): Post {
    let metadata: PostMetadata = {};
    try {
      if (raw.metadata) {
        metadata = JSON.parse(raw.metadata);
      }
    } catch (error) {
      console.error('Erro ao parsear metadata', error);
    }

    return new Post(
      raw.idpost,
      raw.content,
      raw.categoria_idcategoria,
      raw.user_iduser,
      metadata,
      raw.time,
      raw.image.map((img) => img.image)
    );
  }
}
