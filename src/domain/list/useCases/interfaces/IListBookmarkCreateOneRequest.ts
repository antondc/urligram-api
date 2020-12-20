import { User } from '@domain/user/entities/User';

export type IListBookmarkCreateOneRequest = {
  listId: number;
  bookmarkId: number;
  session: User;
};
