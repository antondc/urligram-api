import { User } from '@domain/user/entities/User';

export interface IUserBookmarkGetAllRequest {
  session: User;
  userId: string;
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size: number;
  offset: number;
}
