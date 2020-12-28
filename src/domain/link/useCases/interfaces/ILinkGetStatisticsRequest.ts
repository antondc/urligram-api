import { User } from '@domain/user/entities/User';

export type ILinkGetStatisticsRequest = {
  linkId: number;
  session: User;
};
