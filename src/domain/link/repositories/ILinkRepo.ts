import { ILinkGetAllRequest } from './interfaces/ILinkGetAllRequest';
import { ILinkGetAllResponse } from './interfaces/ILinkGetAllResponse';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkGetVotesRequest } from './interfaces/ILinkGetVotesRequest';
import { ILinkGetVotesResponse } from './interfaces/ILinkGetVotesResponse';
import { ILinkListGetAllPublicRequest } from './interfaces/ILinkListGetAllPublicRequest';
import { ILinkListGetAllPublicResponse } from './interfaces/ILinkListGetAllPublicResponse';
import { ILinkTagGetAllRequest } from './interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllResponse } from './interfaces/ILinkTagGetAllResponse';
import { ILinkVoteOneRequest } from './interfaces/ILinkVoteOneRequest';
import { ILinkVoteOneResponse } from './interfaces/ILinkVoteOneResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
  linkGetAll: (linkGetAllRequest: ILinkGetAllRequest) => Promise<ILinkGetAllResponse>;
  linkListGetAllPublic: (linkListGetAllPublicRequest: ILinkListGetAllPublicRequest) => Promise<ILinkListGetAllPublicResponse>;
  linkTagGetAll: (linkTagGetAllRequest: ILinkTagGetAllRequest) => Promise<ILinkTagGetAllResponse>;
  linkGetVotes: (linkGetVotesRequest: ILinkGetVotesRequest) => Promise<ILinkGetVotesResponse>;
  linkVoteOne: (linkVoteOneRequest: ILinkVoteOneRequest) => Promise<ILinkVoteOneResponse>;
}
