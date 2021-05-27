import { User } from '@domain/user/entities/User';

export interface IUserListGetAllPublicRequest {
  userId: string;
  session: User;
  sort?: 'id' | '-id' | 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  size?: number;
  offset?: number;
  filter?: {
    role?: string[];
    lists?: string[];
  };
}
