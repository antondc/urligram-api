import { User } from '@domain/user/entities/User';

export type IListBookmarkGetOneRequest = {
  listId: number;
  bookmarkId: number;
  session: User;
};
