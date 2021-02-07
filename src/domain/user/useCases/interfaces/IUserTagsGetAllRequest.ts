import { User } from '@domain/user/entities/User';

export type IUserTagsGetAllRequest = {
  session: User;
  userId: string;
  sort: 'id' | '-id' | 'name' | '-name' | 'count' | '-count';
  size: number;
  offset: number;
};
