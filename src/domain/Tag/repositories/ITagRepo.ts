import { Link } from '@domain/link/entities/Link';
import { List } from '@domain/list/entities/List';
import { ITagGetAllResponseDTO } from '@domain/tag/dto/ITagGetAllResponseDTO';
import { Tag } from '@domain/tag/entities/Tag';

export interface ITagRepo {
  tagGetAll: () => Promise<ITagGetAllResponseDTO>;
  tagGetOne: (findUserDTO) => Promise<Tag>;
  tagLinkGetAll: (findUserDTO) => Promise<Link[]>;
  tagListGetAll: (findUserDTO) => Promise<List[]>;
}
