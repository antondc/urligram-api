export type IListBookmarkUserUpsertOneResponse = {
  createdAt: number;
  updatedAt: number;
  listId: number;
  bookmarkId: number;
  userId: string;
  pending?: boolean;
};
