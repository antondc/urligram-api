import { ILinkGetAllPublicRequest } from './interfaces/ILinkGetAllPublicRequest';
import { ILinkGetAllPublicResponse } from './interfaces/ILinkGetAllPublicResponse';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkGetVotesRequest } from './interfaces/ILinkGetVotesRequest';
import { ILinkGetVotesResponse } from './interfaces/ILinkGetVotesResponse';
import { ILinkListGetAllPublicRequest } from './interfaces/ILinkListGetAllPublicRequest';
import { ILinkListGetAllPublicResponse } from './interfaces/ILinkListGetAllPublicResponse';
import { ILinkTagGetAllRequest } from './interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllResponse } from './interfaces/ILinkTagGetAllResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
  linkGetAllPublic: (linkGetAllPublicRequest: ILinkGetAllPublicRequest) => Promise<ILinkGetAllPublicResponse>;
  linkListGetAllPublic: (linkListGetAllPublicRequest: ILinkListGetAllPublicRequest) => Promise<ILinkListGetAllPublicResponse>;
  linkTagGetAll: (linkTagGetAllRequest: ILinkTagGetAllRequest) => Promise<ILinkTagGetAllResponse>;
  linkGetVotes: (linkGetVotesRequest: ILinkGetVotesRequest) => Promise<ILinkGetVotesResponse>;
}
