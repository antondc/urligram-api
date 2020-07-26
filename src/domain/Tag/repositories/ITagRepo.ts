import { ITagBookmarkGetAllPublicRequest } from './interfaces/ITagBookmarkGetAllPublicRequest';
import { ITagBookmarkGetAllPublicResponse } from './interfaces/ITagBookmarkGetAllPublicResponse';
import { ITagGetAllResponse } from './interfaces/ITagGetAllResponse';
import { ITagListGetAllPublicRequest } from './interfaces/ITagListGetAllPublicRequest';
import { ITagListGetAllPublicResponse } from './interfaces/ITagListGetAllPublicResponse';

export interface ITagRepo {
  tagGetAll: () => Promise<ITagGetAllResponse>;
  tagListGetAllPublic: (tagListGetAllPublicRequest: ITagListGetAllPublicRequest) => Promise<ITagListGetAllPublicResponse>;
  tagBookmarkGetAllPublic: (tagBookmarkGetAllPublicRequest: ITagBookmarkGetAllPublicRequest) => Promise<ITagBookmarkGetAllPublicResponse>;
}
