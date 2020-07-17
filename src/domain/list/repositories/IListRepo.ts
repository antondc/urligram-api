import { IListBookmarkGetOneRequest } from './interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneResponse } from './interfaces/IListBookmarkGetOneResponse';
import { IListGetOneRequest } from './interfaces/IListGetOneRequest';
import { IListGetOneResponse } from './interfaces/IListGetOneResponse';

export interface IListRepo {
  listGetOne: (listGetOneRequest: IListGetOneRequest) => Promise<IListGetOneResponse>;
  listBookmarkGetOne: (listBookmarkGetOneRequest: IListBookmarkGetOneRequest) => Promise<IListBookmarkGetOneResponse>;
}
