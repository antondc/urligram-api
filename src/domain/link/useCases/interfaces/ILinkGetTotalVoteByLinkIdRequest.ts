import { User } from '@domain/user/entities/User';

export type ILinkGetTotalVoteByLinkIdRequest = {
  linkId: number;
  session: User;
};
