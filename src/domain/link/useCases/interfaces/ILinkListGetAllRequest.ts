import { User } from '@domain/user/entities/User';

export type ILinkListGetAllRequest = {
  linkId: number;
  session: User;
};
