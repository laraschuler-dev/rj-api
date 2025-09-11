export function generateUniqueKey(data: { 
  id: number; 
  sharedBy?: { id: number; sharedAt: Date | string };
}) {
  if (data.sharedBy) {
    const timestamp = data.sharedBy.sharedAt instanceof Date
      ? data.sharedBy.sharedAt.getTime()
      : new Date(data.sharedBy.sharedAt).getTime();

    return `shared:${data.sharedBy.id}:${data.id}:${timestamp}`;
  }
  return `post:${data.id}`;
}
