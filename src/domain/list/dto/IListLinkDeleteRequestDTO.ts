import { User } from '@domain/user/entities/User';

export type IListLinkDeleteRequestDTO = {
  listId: number;
  linkId: number;
  session: User;
};
