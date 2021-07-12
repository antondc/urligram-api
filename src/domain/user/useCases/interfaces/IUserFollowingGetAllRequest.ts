import { User } from '@domain/user/entities/User';

export interface IUserFollowingGetAllRequest {
  session: User;
  userId: string;
  sort?: 'order' | '-order' | 'name' | '-name' | 'login' | '-login' | 'bookmarks' | '-bookmarks';
  size: number;
  offset: number;
  filter?: {
    tags?: string;
  };
}
