export type IListGetAllRequest = {
  userId?: string;
  sort?: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  size?: number;
  offset?: number;
  filter: {
    tags?: string;
  };
};
