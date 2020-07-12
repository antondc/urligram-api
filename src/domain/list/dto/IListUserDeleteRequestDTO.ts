import { User } from '@domain/user/entities/User';

export interface IListUserDeleteRequestDTO {
  listId: number;
  userId: string;
  session: User;
}
