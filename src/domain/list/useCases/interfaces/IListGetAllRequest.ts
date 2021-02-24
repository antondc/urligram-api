import { User } from '@domain/user/entities/User';

export type IListGetAllRequest = {
  session?: User;
  sort?: 'id' | '-id' | 'createdat' | '-createdat' | 'updatedat' | '-updatedat' | 'members' | '-members' | 'bookmarks' | '-bookmarks';
  size?: number;
  offset?: number;
};
