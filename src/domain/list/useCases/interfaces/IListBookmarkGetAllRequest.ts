import { User } from '@domain/user/entities/User';

export type IListBookmarkGetAllRequest = {
  listId: number;
  session: User;
};
