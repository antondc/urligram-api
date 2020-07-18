import { User } from '@domain/user/entities/User';

export interface IListCreateRequest {
  session: User;
  listName: string;
  listDescription: string;
  listIsPrivate: boolean;
}
