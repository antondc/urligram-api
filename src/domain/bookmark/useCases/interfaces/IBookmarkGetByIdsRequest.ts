import { User } from '@domain/user/entities/User';

export type IBookmarkGetByIdsRequest = {
  session: User;
  ids: string[];
};
