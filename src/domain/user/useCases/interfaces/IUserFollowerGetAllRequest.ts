import { User } from '@domain/user/entities/User';

export interface IUserFollowerGetAllRequest {
  session: User;
  userId: string;
  sort?: 'order' | '-order' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size: number;
  offset: number;
}
