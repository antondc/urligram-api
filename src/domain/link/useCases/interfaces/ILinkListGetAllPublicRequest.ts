import { User } from '@domain/user/entities/User';

export type ILinkListGetAllPublicRequest = {
  linkId: number;
  session: User;
};
