import { User } from '@domain/user/entities/User';

export type IListLinkCreateRequestDTO = {
  listId: number;
  linkId: number;
  session: User;
};
