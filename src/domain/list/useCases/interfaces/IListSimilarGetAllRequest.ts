import { User } from '@domain/user/entities/User';

export type IListSimilarGetAllRequest = {
  session?: User;
  listId: number;
  sort?: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members';
  offset?: number;
  size?: number;
};
