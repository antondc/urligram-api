import { IListGetOneRequest } from './interfaces/IListGetOneRequest';
import { IListGetOneResponse } from './interfaces/IListGetOneResponse';

export interface IListRepo {
  listGetOne: (listGetOneRequest: IListGetOneRequest) => Promise<IListGetOneResponse>;
}
