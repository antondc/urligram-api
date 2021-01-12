import { User } from '@domain/user/entities/User';

export type ILinkVoteOneRequest = {
  linkId: number;
  session: User;
  vote: boolean;
};
