import { User } from '@domain/user/entities/User';

export type ILinkGetAllRequest = {
  session: User;
  sort: 'order' | '-order' | 'most-bookmarked' | '-most-bookmarked' | 'created' | '-created' | 'vote' | '-vote' | 'last-bookmarked' | '-last-bookmarked';
  size: number;
  offset: number;
  filter?: {
    tags?: string[];
  };
};
