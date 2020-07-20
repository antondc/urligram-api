import { User } from '@domain/user/entities/User';

export interface IListGetAllRequest {
  session: User;
}
