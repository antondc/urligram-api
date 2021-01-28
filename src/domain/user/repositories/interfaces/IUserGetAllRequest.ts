export type IUserGetAllRequest = {
  sessionId: string;
  sort?:
    | 'order'
    | '-order'
    | 'createdAt'
    | '-createdAt'
    | 'updatedAt'
    | '-updatedAt'
    | 'followers'
    | '-followers'
    | 'following'
    | '-following'
    | 'bookmarks'
    | '-bookmarks'
    | 'lists'
    | '-lists';
  size?: number;
  offset?: number;
};
