import { User } from '@domain/user/entities/User';

export interface IUserBookmarkGetAllRequest {
  session: User;
  userId: string;
  sort: 'id' | '-id' | 'createdat' | '-createdat' | 'updatedat' | '-updatedat' | 'vote' | '-vote' | 'timesbookmarked' | '-timesbookmarked';
  size: number;
  offset: number;
}
