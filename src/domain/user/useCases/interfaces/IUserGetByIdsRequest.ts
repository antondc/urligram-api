import { User } from '@domain/user/entities/User';

export type IUserGetByIdsRequest = {
  session: User;
  userIds: string[];
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
};
