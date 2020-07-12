import { User } from '@domain/user/entities/User';

export type IListUserGetAllRequestDTO = {
  listId: number;
  session: User;
};
