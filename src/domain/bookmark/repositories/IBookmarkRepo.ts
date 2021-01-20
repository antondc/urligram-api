import { IBookmarkGetAllByLinkIdRequest } from './interfaces/IBookmarkGetAllByLinkIdRequest';
import { IBookmarkGetAllByLinkIdResponse } from './interfaces/IBookmarkGetAllByLinkIdResponse';
import { IBookmarkGetAllPublicRequest } from './interfaces/IBookmarkGetAllPublicRequest';
import { IBookmarkGetAllPublicResponse } from './interfaces/IBookmarkGetAllPublicResponse';
import { IBookmarkGetOneRequest } from './interfaces/IBookmarkGetOneRequest';
import { IBookmarkGetOneResponse } from './interfaces/IBookmarkGetOneResponse';
import { IBookmarkListGetAllRequest } from './interfaces/IBookmarkListGetAllRequest';
import { IBookmarkListGetAllResponse } from './interfaces/IBookmarkListGetAllResponse';
import { IBookmarkTagGetAllRequest } from './interfaces/IBookmarkTagGetAllRequest';
import { IBookmarkTagGetAllResponse } from './interfaces/IBookmarkTagGetAllResponse';

export interface IBookmarkRepo {
  bookmarkGetOne: (bookmarkGetOneRequest: IBookmarkGetOneRequest) => Promise<IBookmarkGetOneResponse>;
  bookmarkGetAllPublic: (bookmarkGetAllPublicRequest: IBookmarkGetAllPublicRequest) => Promise<IBookmarkGetAllPublicResponse>;
  bookmarkGetAllByLinkId: (bookmarkGetAllByLinkIdRequest: IBookmarkGetAllByLinkIdRequest) => Promise<IBookmarkGetAllByLinkIdResponse>;
  bookmarkTagGetAll: (bookmarkTagGetAllRequest: IBookmarkTagGetAllRequest) => Promise<IBookmarkTagGetAllResponse>;
  bookmarkListGetAll: (bookmarkListGetAllRequest: IBookmarkListGetAllRequest) => Promise<IBookmarkListGetAllResponse>;
}
