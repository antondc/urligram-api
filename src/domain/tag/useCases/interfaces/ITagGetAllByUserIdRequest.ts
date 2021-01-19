import { User } from '@domain/user/entities/User';

export type ITagGetAllByUserIdRequest = {
  session: User;
  userId: string;
};
