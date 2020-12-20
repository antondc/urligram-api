import { User } from '@domain/user/entities/User';

export type IListUserDeleteOneRequest = {
  listId: number;
  userId: string;
  session: User;
};
