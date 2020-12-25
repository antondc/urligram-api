import { User } from '@domain/user/entities/User';

export type ILinkGetAvgVoteByLinkIdRequest = {
  linkId: number;
  session: User;
};
