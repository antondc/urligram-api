import { List } from '@domain/list/entitites/List';

export type IUserListGetAllPublicResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
    filter: {
      role?: string;
    };
  };
  lists: List[];
};
