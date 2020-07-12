import { User } from '@domain/user/entities/User';

export interface IListUserCreateRequestDTO {
  listId: number;
  session: User;
}
