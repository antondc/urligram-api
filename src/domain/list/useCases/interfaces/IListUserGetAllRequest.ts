import { User } from '@domain/user/entities/User';

export type IListUserGetAllRequest = {
  listId: number;
  session: User;
};
