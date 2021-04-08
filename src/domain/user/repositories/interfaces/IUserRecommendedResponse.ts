import { Link } from '@domain/link/entities/Link';

export interface IUserRecommendedResponse {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  links: Link[];
}
