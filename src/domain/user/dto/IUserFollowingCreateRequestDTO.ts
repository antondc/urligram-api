import { User } from '../entities/User';

export interface IUserFollowingCreateRequestDTO {
  session: User;
  followedId: string;
}
