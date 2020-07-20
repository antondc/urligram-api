import { ITagGetAllResponse } from './interfaces/TagGetAllResponse';

export interface ITagRepo {
  tagGetAll: () => Promise<ITagGetAllResponse>;
}
