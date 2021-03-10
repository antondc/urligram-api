import { User } from '@domain/user/entities/User';

export type IUserGetAllRequest = {
  session: User;
  sort?:
    | 'order'
    | '-order'
    | 'name'
    | '-name'
    | 'createdat'
    | '-createdat'
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
  };
};
