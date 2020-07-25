import { IListBookmarkCreateOneRequest } from './interfaces/IListBookmarkCreateOneRequest';
import { IListBookmarkCreateOneResponse } from './interfaces/IListBookmarkCreateOneResponse';
import { IListBookmarkDeleteOneRequest } from './interfaces/IListBookmarkDeleteOneRequest';
import { IListBookmarkDeleteOneResponse } from './interfaces/IListBookmarkDeleteOneResponse';
import { IListBookmarkGetAllRequest } from './interfaces/IListBookmarkGetAllRequest';
import { IListBookmarkGetAllResponse } from './interfaces/IListBookmarkGetAllResponse';
import { IListBookmarkGetOneRequest } from './interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneResponse } from './interfaces/IListBookmarkGetOneResponse';
import { IListCreateOneRequest } from './interfaces/IListCreateOneRequest';
import { IListCreateOneResponse } from './interfaces/IListCreateOneResponse';
import { IListGetAllPublicResponse } from './interfaces/IListGetAllPublicResponse';
import { IListGetOneByIdRequest } from './interfaces/IListGetOneByIdRequest';
import { IListGetOneByIdResponse } from './interfaces/IListGetOneByIdResponse';
import { IListUpdateOneRequest } from './interfaces/IListUpdateOneRequest';
import { IListUpdateOneResponse } from './interfaces/IListUpdateOneResponse';
import { IListUserGetOneByListIdRequest } from './interfaces/IListUserGetOneByListIdRequest';
import { IListUserGetOneByListIdResponse } from './interfaces/IListUserGetOneByListIdResponse';
import { IListUserGetOneByListNameRequest } from './interfaces/IListUserGetOneByListNameRequest';
import { IListUserGetOneByListNameResponse } from './interfaces/IListUserGetOneByListNameResponse';

export interface IListRepo {
  listGetOneById: (listGetOneByIdRequest: IListGetOneByIdRequest) => Promise<IListGetOneByIdResponse>;
  listGetAllPublic: () => Promise<IListGetAllPublicResponse>;
  listBookmarkGetOne: (listBookmarkGetOneRequest: IListBookmarkGetOneRequest) => Promise<IListBookmarkGetOneResponse>;
  listUserGetOneByListId: (listUserGetOneRequest: IListUserGetOneByListIdRequest) => Promise<IListUserGetOneByListIdResponse>;
  listUserGetOneByListName: (listUserGetOneRequest: IListUserGetOneByListNameRequest) => Promise<IListUserGetOneByListNameResponse>;
  listCreateOne: (listCreateOneRequest: IListCreateOneRequest) => Promise<IListCreateOneResponse>;
  listUpdateOne: (listUpdateOneRequestDTO: IListUpdateOneRequest) => Promise<IListUpdateOneResponse>;
  listBookmarkGetAll: (listBookmarkGetAllRequestDTO: IListBookmarkGetAllRequest) => Promise<IListBookmarkGetAllResponse>;
  listBookmarkCreateOne: (listBookmarkCreateOneRequestDTO: IListBookmarkCreateOneRequest) => Promise<IListBookmarkCreateOneResponse>;
  listBookmarkDeleteOne: (listBookmarkDeleteOneRequestDTO: IListBookmarkDeleteOneRequest) => Promise<IListBookmarkDeleteOneResponse>;
}
