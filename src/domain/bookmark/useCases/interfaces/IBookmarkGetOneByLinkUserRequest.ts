import { User } from '@domain/user/entities/User';

export type IBookmarkGetOneByLinkUserRequest = {
  linkId: number;
  session: User;
};
