import { User } from '@domain/user/entities/User';

export type IListLinkGetAllRequestDTO = {
  listId: number;
  session: User;
};
