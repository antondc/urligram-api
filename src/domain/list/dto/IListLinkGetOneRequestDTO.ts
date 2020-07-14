import { User } from '@domain/user/entities/User';

export type IListLinkGetOneRequestDTO = {
  listId: number;
  linkId: number;
  session: User;
};
