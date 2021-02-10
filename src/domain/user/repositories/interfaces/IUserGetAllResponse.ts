import { User } from '@domain/user/entities/User';

export type IUserGetAllResponse = {
  totalRows: number;
  users: User[];
};
