export interface IUserBookmarkGetAllRequest {
  sessionId: string;
  userId: string;
  sort: string;
  size: number;
  offset: number;
}
