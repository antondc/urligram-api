import { User } from '@domain/user/entities/User';

export type IUserBookmarkUserUpdateRequest = {
  session: User;
  bookmarkId: number;
};
