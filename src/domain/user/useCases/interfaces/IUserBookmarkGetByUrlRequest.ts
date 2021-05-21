import { User } from '@domain/user/entities/User';

export type IUserBookmarkGetByUrlRequest = {
  session: User;
  url: string;
};
