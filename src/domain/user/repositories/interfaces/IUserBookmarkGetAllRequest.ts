export interface IUserBookmarkGetAllRequest {
  sessionId: string;
  userId: string;
  sort: 'id' | '-id' | 'createdat' | '-createdat' | 'updatedat' | '-updatedat';
  size: number;
  offset: number;
}
