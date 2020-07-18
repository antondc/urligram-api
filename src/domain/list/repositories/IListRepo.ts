import { IListBookmarkGetOneRequest } from './interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneResponse } from './interfaces/IListBookmarkGetOneResponse';
import { IListCreateOneRequest } from './interfaces/IListCreateOneRequest';
import { IListCreateOneResponse } from './interfaces/IListCreateOneResponse';
import { IListGetOneByIdRequest } from './interfaces/IListGetOneByIdRequest';
import { IListGetOneByIdResponse } from './interfaces/IListGetOneByIdResponse';
import { IListUserAdminGetRequest } from './interfaces/IListUserAdminGetRequest';
import { IListUserAdminGetResponse } from './interfaces/IListUserAdminGetResponse';

export interface IListRepo {
  listGetOneById: (listGetOneByIdRequest: IListGetOneByIdRequest) => Promise<IListGetOneByIdResponse>;
  listBookmarkGetOne: (listBookmarkGetOneRequest: IListBookmarkGetOneRequest) => Promise<IListBookmarkGetOneResponse>;
  listUserAdminGet: (listUserAdminGetRequest: IListUserAdminGetRequest) => Promise<IListUserAdminGetResponse>;
  listCreateOne: (listCreateOneRequest: IListCreateOneRequest) => Promise<IListCreateOneResponse>;
}
