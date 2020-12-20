import { User } from '@domain/user/entities/User';

export interface IUserFollowingDeleteRequest {
  session: User;
  followedId: string;
}
