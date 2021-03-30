import { User } from '@domain/user/entities/User';

export interface IUserBookmarkGetAllRequest {
  session: User;
  userId: string;
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'vote' | '-vote' | 'timesbookmarked' | '-timesbookmarked';
  size: number;
  offset: number;
  filter?: {
    tags?: string[];
  };
}
