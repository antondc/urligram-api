import { User } from '@domain/user/entities/User';

export type IUserBookmarkGetOneRequest = {
  session: User;
  bookmarkId: number;
};
