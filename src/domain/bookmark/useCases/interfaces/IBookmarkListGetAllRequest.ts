import { User } from '@domain/user/entities/User';

export type IBookmarkListGetAllRequest = {
  bookmarkId: number;
  session: User;
};
