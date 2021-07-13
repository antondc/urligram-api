export type IListBookmarkGetAllRequest = {
  listId: number;
  sessionId: string;
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'vote' | '-vote' | 'timesbookmarked' | 'timesbookmarked';
  size: number;
  offset: number;
  filter?: {
    tags?: string[];
  };
};
