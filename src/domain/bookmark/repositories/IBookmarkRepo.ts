import { IBookmarkGetOneRequest } from './interfaces/IBookmarkGetOneRequest';
import { IBookmarkGetOneResponse } from './interfaces/IBookmarkGetOneResponse';

export interface IBookmarkRepo {
  bookmarkGetOne: (bookmarkGetOneRequest: IBookmarkGetOneRequest) => Promise<IBookmarkGetOneResponse>;
}
