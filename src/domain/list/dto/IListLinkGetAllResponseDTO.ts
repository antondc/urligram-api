import { Link } from '@domain/link/entities/Link';
import { List } from '../entities/List';

export type IListLinkGetAllResponseDTO = {
  list: List;
  links: Link[];
};
