import { User } from '@domain/user/entities/User';

export type IBookmarkTagGetAllRequest = {
  bookmarkId: number;
  session: User;
};
