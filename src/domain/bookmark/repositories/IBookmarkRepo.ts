import { IBookmarkGetAllPublicResponse } from './interfaces/IBookmarkGetAllPublicResponse';
import { IBookmarkGetOneRequest } from './interfaces/IBookmarkGetOneRequest';
import { IBookmarkGetOneResponse } from './interfaces/IBookmarkGetOneResponse';
import { IBookmarkTagGetAllRequest } from './interfaces/IBookmarkTagGetAllRequest';
import { IBookmarkTagGetAllResponse } from './interfaces/IBookmarkTagGetAllResponse';

export interface IBookmarkRepo {
  bookmarkGetOne: (bookmarkGetOneRequest: IBookmarkGetOneRequest) => Promise<IBookmarkGetOneResponse>;
  bookmarkGetAllPublic: () => Promise<IBookmarkGetAllPublicResponse>;
  bookmarkTagGetAll: (bookmarkTagGetAllRequest: IBookmarkTagGetAllRequest) => Promise<IBookmarkTagGetAllResponse>;
}
