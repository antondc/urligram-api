export type IUserGetAllRequest = {
  sessionId: string;
  sort?:
    | 'order'
    | '-order'
    | 'name'
    | '-name'
    | 'createdAt'
    | '-createdAt'
    | 'followers'
    | '-followers'
    | 'following'
    | '-following'
    | 'bookmarks'
    | '-bookmarks';
  size?: number;
  offset?: number;
  filter?: {
    name?: string;
  };
};
