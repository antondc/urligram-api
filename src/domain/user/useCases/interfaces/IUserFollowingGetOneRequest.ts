import { User } from '@domain/user/entities/User';

export interface IUserFollowingGetOneRequest {
  session: User;
  followedId: string;
}
