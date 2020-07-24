import { IBookmarkGetOneRequest } from './interfaces/IBookmarkGetOneRequest';
import { IBookmarkGetOneResponse } from './interfaces/IBookmarkGetOneResponse';

export interface IBookmarkRepo {
  bookmarkGetOne: (bookmarkGetOneRequestDTO: IBookmarkGetOneRequest) => Promise<IBookmarkGetOneResponse>;
}
