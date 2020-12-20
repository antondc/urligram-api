import { User } from '@domain/user/entities/User';

export type IListGetOneRequest = {
  listId: number;
  session: User;
};
