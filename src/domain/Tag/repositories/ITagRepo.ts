import { Link } from '@domain/link/entities/Link';
import { List } from '@domain/list/entities/List';
import { Tag } from '@domain/tag/entities/Tag';
import { User } from '@domain/user/entities/User';

export interface ITagRepo {
  tagGetAll: () => Promise<Tag[]>;
  tagGetOne: (findUserDTO) => Promise<Tag>;
  tagLinkGetAll: (findUserDTO) => Promise<Link[]>;
  tagListGetAll: (findUserDTO) => Promise<List[]>;
  tagUserGetAll: (findUserDTO) => Promise<User[]>;
}
