import { User } from '@domain/user/entities/User';

export interface IUserFollowingDeleteRequestDTO {
  session: User;
  followedId: string;
}
