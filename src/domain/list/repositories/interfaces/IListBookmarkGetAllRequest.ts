export type IListBookmarkGetAllRequest = {
  listId: number;
  sessionId: string;
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size: number;
  offset: number;
};
