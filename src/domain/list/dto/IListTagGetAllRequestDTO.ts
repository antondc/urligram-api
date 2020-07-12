import { User } from '@domain/user/entities/User';

export type IListTagGetAllRequestDTO = {
  listId: number;
  session: User;
};
