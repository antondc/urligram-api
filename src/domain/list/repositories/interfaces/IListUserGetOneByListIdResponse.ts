import { User } from '@domain/user/entities/User';

export type IListUserGetOneByListIdResponse = User & {
  userRole: string;
};
