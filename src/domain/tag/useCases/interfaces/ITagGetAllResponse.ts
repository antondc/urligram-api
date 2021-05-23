import { Tag } from '@domain/tag/entities/Tag';

export type ITagGetAllResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
    filter: {
      tags: string[];
    };
  };
  tags: Tag[];
};
