import { User } from '../entities/User';

export interface IUserLinkGetOneRequestDTO {
  session: User;
  linkId: number;
}
