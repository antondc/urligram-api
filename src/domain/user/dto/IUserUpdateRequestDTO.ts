import { User } from '../entities/User';

export interface IUserUpdateRequestDTO {
  session: User;
  name: string;
  email: string;
  statement: string;
  location: string;
}
