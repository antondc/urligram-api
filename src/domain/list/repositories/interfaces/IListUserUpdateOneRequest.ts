import { ListUserRole } from '@domain/list/entitites/ListUserRole';
import { ListUserStatus } from '@domain/list/entitites/ListUserStatus';

export type IListUserUpdateOneRequest = {
  listId: number;
  userId: string;
  userRole: ListUserRole;
  userListStatus: ListUserStatus;
};
