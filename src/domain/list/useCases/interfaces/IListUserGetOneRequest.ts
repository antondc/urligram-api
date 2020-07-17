import { User } from '@domain/user/entities/User';

export type IListUserGetOneRequest = {
  listId: number;
  userId: string;
  session: User;
};
