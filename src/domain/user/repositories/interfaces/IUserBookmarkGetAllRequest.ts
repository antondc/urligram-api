export interface IUserBookmarkGetAllRequest {
  sessionId: string;
  userId: string;
  sort: 'id' | '-id' | 'createdat' | '-createdat' | 'updatedat' | '-updatedat' | 'vote' | '-vote' | 'timesbookmarked' | '-timesbookmarked';
  size: number;
  offset: number;
  filter?: {
    tags?: string[];
  };
}
