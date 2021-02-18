import { Link } from '@domain/link/entities/Link';

type ExtendedTypes = {
  users: {
    id: string;
    name: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
};

export type ILinkGetAllResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
    filter: {
      tags?: string[];
    };
  };
  links: Array<Link & ExtendedTypes>;
};
