import { User } from '../entities/User';

export interface IUserLinkGetAllRequestDTO {
  session: User;
  userId: string;
}
