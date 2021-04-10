import { User } from '@domain/user/entities/User';

export type IBookmarkGetAllPublicRequest = {
  session: User;
  sort: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size: number;
  offset: number;
  filter?: {
    tags?: string[];
  };
};
