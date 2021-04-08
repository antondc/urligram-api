import { User } from '@domain/user/entities/User';

export interface IUserRecommendedGetAllRequest {
  session: User;
  sort?: 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt';
  size?: number;
  offset?: number;
}
