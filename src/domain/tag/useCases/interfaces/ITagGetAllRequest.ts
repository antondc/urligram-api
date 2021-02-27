import { User } from '@domain/user/entities/User';

export type ITagGetAllRequest = {
  session: User;
  sort: 'id' | '-id' | 'name' | '-name' | 'count' | '-count';
  size: number;
  offset: number;
  filter?: {
    name?: string;
  };
};
