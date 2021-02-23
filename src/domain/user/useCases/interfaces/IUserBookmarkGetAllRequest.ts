import { User } from '@domain/user/entities/User';

export interface IUserBookmarkGetAllRequest {
  session: User;
  userId: string;
  sort: 'id' | '-id' | 'createdat' | '-createdat' | 'updatedat' | '-updatedat';
  size: number;
  offset: number;
}
