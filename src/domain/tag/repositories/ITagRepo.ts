import { ITagBookmarkGetAllPublicRequest } from './interfaces/ITagBookmarkGetAllPublicRequest';
import { ITagBookmarkGetAllPublicResponse } from './interfaces/ITagBookmarkGetAllPublicResponse';
import { ITagGetAllRequest } from './interfaces/ITagGetAllRequest';
import { ITagGetAllResponse } from './interfaces/ITagGetAllResponse';
import { ITagListGetAllPublicRequest } from './interfaces/ITagListGetAllPublicRequest';
import { ITagListGetAllPublicResponse } from './interfaces/ITagListGetAllPublicResponse';
import { ITagUserGetAllPublicRequest } from './interfaces/ITagUserGetAllPublicRequest';
import { ITagUserGetAllPublicResponse } from './interfaces/ITagUserGetAllPublicResponse';

export interface ITagRepo {
  tagGetAll: (tagGetAllRequest: ITagGetAllRequest) => Promise<ITagGetAllResponse>;
  tagListGetAllPublic: (tagListGetAllPublicRequest: ITagListGetAllPublicRequest) => Promise<ITagListGetAllPublicResponse>;
  tagBookmarkGetAllPublic: (tagBookmarkGetAllPublicRequest: ITagBookmarkGetAllPublicRequest) => Promise<ITagBookmarkGetAllPublicResponse>;
  tagUserGetAllPublic: (tagUserGetAllPublicRequest: ITagUserGetAllPublicRequest) => Promise<ITagUserGetAllPublicResponse>;
}
