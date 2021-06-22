import { User } from '@domain/user/entities/User';

export type IUserBookmarkUserCreateRequest = {
  session: User;
  bookmarkId: number;
  userId: string;
};
