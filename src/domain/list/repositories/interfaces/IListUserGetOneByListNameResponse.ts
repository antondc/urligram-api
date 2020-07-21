import { User } from '@domain/user/entities/User';

export type IListUserGetOneByListNameResponse = User & {
  userRole: string;
};
