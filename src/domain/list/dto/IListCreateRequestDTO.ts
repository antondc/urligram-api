import { User } from '@domain/user/entities/User';

export interface IListCreateRequestDTO {
  session: User;
  name: string;
  description: string;
  isPrivate: boolean;
}
