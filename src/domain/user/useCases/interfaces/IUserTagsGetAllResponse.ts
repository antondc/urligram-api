import { Tag } from '@domain/tag/entities/Tag';

export type IUserTagsGetAllResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  tags: Tag[];
};
