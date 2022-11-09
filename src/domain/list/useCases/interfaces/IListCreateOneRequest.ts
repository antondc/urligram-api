import { User } from '@domain/user/entities/User';

export interface IListCreateOneRequest {
  session: User;
  listName: string;
  listDescription: string;
  listIsPublic: boolean;
}
