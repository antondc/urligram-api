import { User } from '../entities/User';

export interface IUserListGetAllRequestDTO {
  userId: string;
  session: User;
}
