import { User } from '../entities/User';

export interface IUserLogoutRequestDTO {
  session: User;
}
