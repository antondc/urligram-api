import { IListBookmarkGetOneRequest } from './interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneResponse } from './interfaces/IListBookmarkGetOneResponse';
import { IListCreateRequest } from './interfaces/IListCreateRequest';
import { IListCreateResponse } from './interfaces/IListCreateResponse';
import { IListGetOneRequest } from './interfaces/IListGetOneRequest';
import { IListGetOneResponse } from './interfaces/IListGetOneResponse';
import { IListUserGetOneRequest } from './interfaces/IListUserGetOneRequest';
import { IListUserGetOneResponse } from './interfaces/IListUserGetOneResponse';

export interface IListRepo {
  listGetOne: (listGetOneRequest: IListGetOneRequest) => Promise<IListGetOneResponse>;
  listBookmarkGetOne: (listBookmarkGetOneRequest: IListBookmarkGetOneRequest) => Promise<IListBookmarkGetOneResponse>;
  listUserGetOne: (listUserGetOneRequest: IListUserGetOneRequest) => Promise<IListUserGetOneResponse>;
  listCreate: (listCreateRequest: IListCreateRequest) => Promise<IListCreateResponse>;
}
