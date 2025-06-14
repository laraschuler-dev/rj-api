import { PostMetadata } from "../entities/Post";
import File  from "multer";

export class CreatePostDTO {
  private constructor(
    public readonly content: string,
    public readonly categoria_idcategoria: number, // Mude para o nome do seu banco
    public readonly user_iduser: number, // Mude para o nome do seu banco
    public readonly metadata: PostMetadata,
    public readonly images?: Express.Multer.File[]
  ) {}

  static create(props: {
    content: string;
    categoria_idcategoria: number;
    user_iduser: number;
    metadata?: PostMetadata;
    images?: Express.Multer.File[];
  }): [string?, CreatePostDTO?] {
    if (!props.content) return ["Conteúdo é obrigatório"];
    if (!props.categoria_idcategoria) return ["Categoria é obrigatória"];

    return [
      undefined,
      new CreatePostDTO(
        props.content,
        props.categoria_idcategoria,
        props.user_iduser,
        props.metadata || {},
        props.images
      ),
    ];
  }
}