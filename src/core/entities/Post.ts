export type PostMetadata = {
  title?: string;
  location?: string;
  date?: string;
  itemType?: string;
  condition?: string;
  availability?: string;
  description?: string;
  isAnonymous?: boolean;
  goal?: string;
  deadline?: string;
  organizer?: string;
  type?: string;
  urgency?: string;
  serviceType?: string;
  qualifications?: string;
  format?: string;
  duration?: string;
  requirements?: string;
};

export class Post {
  constructor(
    public readonly id: number | null,
    public readonly content: string,
    public readonly categoria_idcategoria: number,
    public readonly user_iduser: number,
    public readonly metadata: PostMetadata,
    public readonly createdAt: Date = new Date()
  ) {}
}
