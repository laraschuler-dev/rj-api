export type CommentDTO = {
  id: number;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
    avatarUrl: string | null;
  };
};
