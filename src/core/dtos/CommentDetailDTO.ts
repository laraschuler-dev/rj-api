export type CommentDetailDTO = {
  id: number;
  comment: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
    avatarUrl: string | null;
  };
};
