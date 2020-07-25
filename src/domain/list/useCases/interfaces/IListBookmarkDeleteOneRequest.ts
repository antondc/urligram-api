import { User } from '@domain/user/entities/User';

export type IListBookmarkDeleteOneRequest = {
  listId: number;
  bookmarkId: number;
  session: User;
};
