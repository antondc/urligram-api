import { User } from '@domain/user/entities/User';

export interface IUserBookmarkGetAllRequest {
  session: User;
  userId: string;
}
