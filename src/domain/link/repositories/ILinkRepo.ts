import { ILinkGetAllPublicRequest } from './interfaces/ILinkGetAllPublicRequest';
import { ILinkGetAllPublicResponse } from './interfaces/ILinkGetAllPublicResponse';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkListGetAllRequest } from './interfaces/ILinkListGetAllRequest';
import { ILinkListGetAllResponse } from './interfaces/ILinkListGetAllResponse';
import { ILinkTagGetAllRequest } from './interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllResponse } from './interfaces/ILinkTagGetAllResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
  linkGetAllPublic: (linkGetAllPublicRequest: ILinkGetAllPublicRequest) => Promise<ILinkGetAllPublicResponse>;
  linkListGetAll: (linkListGetAllRequest: ILinkListGetAllRequest) => Promise<ILinkListGetAllResponse>;
  linkTagGetAll: (linkTagGetAllRequest: ILinkTagGetAllRequest) => Promise<ILinkTagGetAllResponse>;
}
