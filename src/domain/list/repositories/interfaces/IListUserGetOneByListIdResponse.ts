import { User } from '@domain/user/entities/User';

interface UserWithUserListRole extends User {
  userRole?: 'reader' | 'editor' | 'admin';
  userListStatus?: string;
}

export type IListUserGetOneByListIdResponse = UserWithUserListRole;
