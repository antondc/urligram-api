import { User } from '@domain/user/entities/User';

export type ILinkGetAllRequest = {
  session: User;
  sort: 'id' | '-id' | 'order' | '-order' | 'count' | '-count';
  size: number;
  offset: number;
};
