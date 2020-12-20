import { User } from '@domain/user/entities/User';

export type IListUserCreateOneRequest = {
  listId: number;
  userId: string;
  session: User;
};
