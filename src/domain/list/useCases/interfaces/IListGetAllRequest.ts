import { User } from '@domain/user/entities/User';

export type IListGetAllRequest = {
  session?: User;
  sort?: 'id' | '-id' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt' | 'members' | '-members';
  size?: number;
  offset?: number;
};
