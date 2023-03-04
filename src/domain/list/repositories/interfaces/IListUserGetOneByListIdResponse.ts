import { ListUserRole } from '@domain/list/entitites/ListUserRole';
import { ListUserStatus } from '@domain/list/entitites/ListUserStatus';
import { User } from '@domain/user/entities/User';

interface UserWithUserListRole extends User {
  userRole?: ListUserRole;
  userListStatus?: ListUserStatus;
}

export type IListUserGetOneByListIdResponse = UserWithUserListRole;
