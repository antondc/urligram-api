import { User } from '@domain/user/entities/User';

export type IUserFollowingGetAllResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  usersData: User[];
};
