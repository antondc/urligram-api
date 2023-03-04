import { User } from '@domain/user/entities/User';

interface UserWithUserListRole extends User {
  userRole?: 'reader' | 'editor' | 'admin';
  userListStatus?: 'pending' | 'active';
}

export type IListUserGetOneByListIdResponse = UserWithUserListRole;
