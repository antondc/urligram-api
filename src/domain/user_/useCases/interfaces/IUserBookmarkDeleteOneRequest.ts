import { User } from '@domain/user/entities/User';

export interface IUserBookmarkDeleteOneRequest {
  bookmarkId: number;
  session: User;
}
