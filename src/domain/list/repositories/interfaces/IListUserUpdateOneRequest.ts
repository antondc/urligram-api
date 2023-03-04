import { UserListRole } from '@domain/user/entities/UserListRole';
import { UserListStatus } from '@domain/user/entities/UserListStatus';

export type IListUserUpdateOneRequest = {
  listId: number;
  userId: string;
  userRole: UserListRole;
  userListStatus: UserListStatus;
};
