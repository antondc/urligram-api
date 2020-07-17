import { User } from '@domain/user/entities/User';

export interface IUserListGetAllRequest {
  userId: string;
  session: User;
}
