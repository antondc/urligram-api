import { ILinkGetAllRequest } from './interfaces/ILinkGetAllRequest';
import { ILinkGetAllResponse } from './interfaces/ILinkGetAllResponse';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkListGetAllRequest } from './interfaces/ILinkListGetAllRequest';
import { ILinkListGetAllResponse } from './interfaces/ILinkListGetAllResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
  linkGetAll: (linkGetAllRequest: ILinkGetAllRequest) => Promise<ILinkGetAllResponse>;
  linkListGetAll: (linkListGetAllRequest: ILinkListGetAllRequest) => Promise<ILinkListGetAllResponse>;
}
