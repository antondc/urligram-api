import { Link } from '@domain/link/entities/Link';

interface tags {
  id: number;
  name: string;
}

interface users {
  id: string;
  name: string;
}

export type ILinkGetOneResponse = Link & {
  users: users[];
  tags: tags[];
};
