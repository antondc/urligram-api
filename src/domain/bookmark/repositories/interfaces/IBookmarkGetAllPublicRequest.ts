export type IBookmarkGetAllPublicRequest = {
  sessionId: string;
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size: number;
  offset: number;
  filter?: {
    tags?: string[];
  };
};
