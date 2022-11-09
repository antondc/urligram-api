import { User } from '@domain/user/entities/User';

export interface IListUpdateOneRequest {
  session: User;
  listId: number;
  name: string;
  description: string;
  isPublic: boolean;
}
