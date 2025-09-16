export function generateUniqueKey(data: {
  id: number; // id do post (quando original)
  sharedBy?: {
    id: number; // id do usuário que compartilhou
    shareId: number; // id do compartilhamento
    sharedAt: Date | string;
  };
}) {
  if (data.sharedBy) {
    const timestamp =
      data.sharedBy.sharedAt instanceof Date
        ? data.sharedBy.sharedAt.getTime()
        : new Date(data.sharedBy.sharedAt).getTime();

    // agora usa shareId no lugar do postId
    return `shared:${data.sharedBy.id}:${data.sharedBy.shareId}:${timestamp}`;
  }
  return `post:${data.id}`;
}
