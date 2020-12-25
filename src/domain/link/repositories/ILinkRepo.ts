import { ILinkGetAllPublicRequest } from './interfaces/ILinkGetAllPublicRequest';
import { ILinkGetAllPublicResponse } from './interfaces/ILinkGetAllPublicResponse';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkGetVotesByLinkIdRequest } from './interfaces/ILinkGetVotesByLinkIdRequest';
import { ILinkGetVotesByLinkIdResponse } from './interfaces/ILinkGetVotesByLinkIdResponse';
import { ILinkListGetAllPublicRequest } from './interfaces/ILinkListGetAllPublicRequest';
import { ILinkListGetAllPublicResponse } from './interfaces/ILinkListGetAllPublicResponse';
import { ILinkTagGetAllRequest } from './interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllResponse } from './interfaces/ILinkTagGetAllResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
  linkGetAllPublic: (linkGetAllPublicRequest: ILinkGetAllPublicRequest) => Promise<ILinkGetAllPublicResponse>;
  linkListGetAllPublic: (linkListGetAllPublicRequest: ILinkListGetAllPublicRequest) => Promise<ILinkListGetAllPublicResponse>;
  linkTagGetAll: (linkTagGetAllRequest: ILinkTagGetAllRequest) => Promise<ILinkTagGetAllResponse>;
  linkGetVotesByLinkId: (linkGetVotesByLinkIdRequest: ILinkGetVotesByLinkIdRequest) => Promise<ILinkGetVotesByLinkIdResponse>;
}
