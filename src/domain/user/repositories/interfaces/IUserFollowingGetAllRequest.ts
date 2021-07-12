export interface IUserFollowingGetAllRequest {
  sessionId: string;
  userId: string;
  sort?: 'order' | '-order' | 'name' | '-name' | 'login' | '-login' | 'bookmarks' | '-bookmarks';
  size: number;
  offset: number;
  filter: {
    tags?: string;
  };
}
