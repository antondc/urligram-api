export type IListGetAllRequest = {
  userId?: string;
  sort?: 'id' | '-id' | 'createdat' | '-createdat' | 'updatedat' | '-updatedat' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  size?: number;
  offset?: number;
};
