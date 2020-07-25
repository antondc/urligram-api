import { User } from '@domain/user/entities/User';

export type IListUserUpdateOneRequest = {
  listId: number;
  userId: string;
  session: User;
  userRole: 'reader' | 'editor';
};
