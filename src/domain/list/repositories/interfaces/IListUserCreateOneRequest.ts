import { ListUserRole } from '@domain/list/entitites/ListUserRole';
import { ListUserStatus } from '@domain/list/entitites/ListUserStatus';

export type IListUserCreateOneRequest = {
  listId: number;
  userId: string;
  userListStatus: ListUserStatus;
  userRole: ListUserRole;
};
