import { User } from '@domain/user/entities/User';

export type ILinkUsersGetAllResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  };
  users: User[];
};
