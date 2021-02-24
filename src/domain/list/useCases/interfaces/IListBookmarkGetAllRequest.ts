import { User } from '@domain/user/entities/User';

export type IListBookmarkGetAllRequest = {
  listId: number;
  session: User;
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'vote' | '-vote' | 'timesbookmarked' | 'timesbookmarked';
  size: number;
  offset: number;
};
