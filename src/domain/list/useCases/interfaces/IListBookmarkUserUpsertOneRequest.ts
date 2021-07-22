import { User } from '@domain/user/entities/User';

export type IListBookmarkUserUpsertOneRequest = {
  session: User;
  listId: number;
  bookmarkId: number;
  userId: string;
  pending: boolean;
};
