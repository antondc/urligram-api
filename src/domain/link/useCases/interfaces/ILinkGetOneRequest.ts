import { User } from '@domain/user/entities/User';

export type ILinkGetOneRequest = {
  linkId: number;
  session: User;
};
