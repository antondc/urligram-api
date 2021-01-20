import { User } from '@domain/user/entities/User';

export type IUserTagsGetAllRequest = {
  session: User;
  userId: string;
};
