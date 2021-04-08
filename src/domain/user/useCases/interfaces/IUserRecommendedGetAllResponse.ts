import { Link } from '@domain/link/entities/Link';

export type IUserRecommendedGetAllResponse = {
  links: Link[];
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
};
