import { User } from '@domain/user/entities/User';

export type IListGetAllRequest = {
  session?: User;
  sort?: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  size?: number;
  offset?: number;
  filter: {
    tags?: string;
  };
};
