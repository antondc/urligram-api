import { User } from '@domain/user/entities/User';

export interface IListUserUpdateRequestDTO {
  listId: number;
  userId: string;
  session: User;
  newRole: string;
}
