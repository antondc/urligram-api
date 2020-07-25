import { User } from '@domain/user/entities/User';

interface UserWithUserListRole extends User {
  userListRole?: string;
}

export type IListUserGetAllResponse = UserWithUserListRole[];
