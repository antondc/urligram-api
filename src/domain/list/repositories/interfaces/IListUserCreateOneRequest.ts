import { UserListRole } from '@domain/user/entities/UserListRole';
import { UserListStatus } from '@domain/user/entities/UserListStatus';

export type IListUserCreateOneRequest = {
  listId: number;
  userId: string;
  userListStatus: UserListStatus;
  userRole: UserListRole;
};
