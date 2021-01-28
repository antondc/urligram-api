import { User } from '@domain/user/entities/User';

export interface IUserListGetAllPublicRequest {
  userId: string;
  session: User;
  sort?: 'id' | '-id' | 'order' | '-order' | 'bookmarks' | '-bookmarks' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
}
