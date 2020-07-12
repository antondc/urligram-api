import { User } from '@domain/user/entities/User';

export type IListUserGetOneRequestDTO = {
  listId: number;
  userId: string;
  session: User;
};
