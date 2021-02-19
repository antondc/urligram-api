import { List } from '@domain/list/entitites/List';

export type IListGetAllResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  lists: List[];
};
