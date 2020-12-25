import { User } from '@domain/user/entities/User';

export type ILinkGetTotalVoteRequest = {
  linkId: number;
  session: User;
};
