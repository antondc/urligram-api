import { User } from '@domain/user/entities/User';

export type ILinkUsersGetAllRequest = {
  session: User;
  linkId: number;
  sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
};
