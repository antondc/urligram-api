import { ListUserRole } from '@domain/list/entitites/ListUserRole';
import { User } from '@domain/user/entities/User';

export type IListUserGetOneByListNameResponse = User & {
  userRole: ListUserRole;
};
