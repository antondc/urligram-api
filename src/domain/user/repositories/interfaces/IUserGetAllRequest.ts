export type IUserGetAllRequest = {
  sessionId: string;
  sort?:
    | 'order'
    | '-order'
    | 'name'
    | '-name'
    | 'createdat'
    | '-createdat'
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
