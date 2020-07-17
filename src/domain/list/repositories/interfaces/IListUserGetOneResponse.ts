import { User } from '@domain/user/entities/User';

export type IListUserGetOneResponse = User & {
  userListRole?: string;
};
