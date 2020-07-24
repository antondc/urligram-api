import { User } from '@domain/user/entities/User';

export type IBookmarkGetOneRequest = {
  bookmarkId: number;
  session: User;
};
