import { IListBookmarkGetOneRequest } from './interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneResponse } from './interfaces/IListBookmarkGetOneResponse';
import { IListCreateRequest } from './interfaces/IListCreateRequest';
import { IListCreateResponse } from './interfaces/IListCreateResponse';
import { IListGetOneByIdRequest } from './interfaces/IListGetOneByIdRequest';
import { IListGetOneByIdResponse } from './interfaces/IListGetOneByIdResponse';
import { IListUserAdminGetRequest } from './interfaces/IListUserAdminGetRequest';
import { IListUserAdminGetResponse } from './interfaces/IListUserAdminGetResponse';

export interface IListRepo {
  listGetOneById: (listGetOneByIdRequest: IListGetOneByIdRequest) => Promise<IListGetOneByIdResponse>;
  listBookmarkGetOne: (listBookmarkGetOneRequest: IListBookmarkGetOneRequest) => Promise<IListBookmarkGetOneResponse>;
  listUserAdminGet: (listUserAdminGetRequest: IListUserAdminGetRequest) => Promise<IListUserAdminGetResponse>;
  listCreate: (listCreateRequest: IListCreateRequest) => Promise<IListCreateResponse>;
}
