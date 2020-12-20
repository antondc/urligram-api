import { User } from '@domain/user/entities/User';

export interface IUserFollowingCreateRequest {
  session: User;
  followedId: string;
}
