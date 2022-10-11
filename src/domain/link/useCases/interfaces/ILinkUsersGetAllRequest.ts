import { User } from '@domain/user/entities/User';

export type ILinkUsersGetAllRequest = {
  session: User;
  linkId: number;
  sort?:
    | 'order'
    | '-order'
    | 'createdAt'
    | '-createdAt'
    | 'updatedAt'
    | '-updatedAt'
    | 'followers'
    | '-followers'
    | 'following'
    | '-following'
    | 'bookmarks'
    | '-bookmarks'
    | 'lists'
    | '-lists';
  size?: number;
  offset?: number;
  filter?: {
    name?: string;
    tags?: string;
  };
};
