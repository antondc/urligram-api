import { ListUserRole } from '@domain/list/entitites/ListUserRole';
import { User } from '@domain/user/entities/User';

export type IListUserUpsertOneRequest = {
  listId: number;
  userId: string;
  session: User;
  userRole: ListUserRole;
};
