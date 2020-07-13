import { User } from '../entities/User';

export interface IUserLinkDeleteRequestDTO {
  linkId: number;
  session: User;
}
