import { User } from '@domain/user/entities/User';

export type IUserGetAllRequest = {
  session: User;
  sort?:
    | 'order'
    | '-order'
    | 'name'
    | '-name'
    | 'createdAt'
    | '-createdAt'
    | 'followers'
    | '-followers'
    | 'following'
    | '-following'
    | 'bookmarks'
    | '-bookmarks';
  size?: number;
  offset?: number;
  filter?: {
    name?: string;
    tags?: string;
  };
};
