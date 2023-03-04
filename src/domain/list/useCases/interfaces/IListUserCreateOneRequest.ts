import { User } from '@domain/user/entities/User';
import { UserListRole } from '@domain/user/entities/UserListRole';

export type IListUserCreateOneRequest = {
  listId: number;
  userId: string;
  session: User;
  userRole: UserListRole;
};
