import { User } from '@domain/user/entities/User';

export type IUserGetAllResponse = {
  meta: {
    totalRows: number;
    offset: number;
    size: number;
    sort: string;
  };
  users: User[];
};
