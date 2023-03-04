import { User } from '@domain/user/entities/User';
import { UserListRole } from '@domain/user/entities/UserListRole';
import { UserListStatus } from '@domain/user/entities/UserListStatus';

interface UserWithUserListRole extends User {
  userRole?: UserListRole;
  userListStatus?: UserListStatus;
}

export type IListUserGetOneByListIdResponse = UserWithUserListRole;
