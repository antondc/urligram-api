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

export type ILinkGetAllPublicResponse = Array<Link & ExtendedTypes>;
