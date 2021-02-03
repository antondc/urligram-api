export type IListSimilarGetAllRequest = {
  sessionId: string;
  listId: number;
  bookmarksIds: number[];
  tagsIds: number[];
  sort?: 'id' | '-id' | 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members';
  offset?: number;
  size?: number;
};
