import { ILinkGetAllRequest } from './interfaces/ILinkGetAllRequest';
import { ILinkGetAllResponse } from './interfaces/ILinkGetAllResponse';
import { ILinkGetOneRequest } from './interfaces/ILinkGetOneRequest';
import { ILinkGetOneResponse } from './interfaces/ILinkGetOneResponse';
import { ILinkGetVotesRequest } from './interfaces/ILinkGetVotesRequest';
import { ILinkGetVotesResponse } from './interfaces/ILinkGetVotesResponse';
import { ILinkListGetAllPublicRequest } from './interfaces/ILinkListGetAllPublicRequest';
import { ILinkListGetAllPublicResponse } from './interfaces/ILinkListGetAllPublicResponse';
import { ILinkNotesGetAllPublicRequest } from './interfaces/ILinkNotesGetAllPublicRequest';
import { ILinkNotesGetAllPublicResponse } from './interfaces/ILinkNotesGetAllPublicResponse';
import { ILinkTagGetAllRequest } from './interfaces/ILinkTagGetAllRequest';
import { ILinkTagGetAllResponse } from './interfaces/ILinkTagGetAllResponse';
import { ILinkUpsertOneRequest } from './interfaces/ILinkUpsertOneRequest';
import { ILinkUpsertOneResponse } from './interfaces/ILinkUpsertOneResponse';
import { ILinkUsersGetIdsPublicRequest } from './interfaces/ILinkUsersGetIdsPublicRequest';
import { ILinkUsersGetIdsPublicResponse } from './interfaces/ILinkUsersGetIdsPublicResponse';
import { ILinkVoteOneRequest } from './interfaces/ILinkVoteOneRequest';
import { ILinkVoteOneResponse } from './interfaces/ILinkVoteOneResponse';

export interface ILinkRepo {
  linkGetOne: (linkGetOneRequest: ILinkGetOneRequest) => Promise<ILinkGetOneResponse>;
  linkGetAll: (linkGetAllRequest: ILinkGetAllRequest) => Promise<ILinkGetAllResponse>;
  linkListGetAllPublic: (linkListGetAllPublicRequest: ILinkListGetAllPublicRequest) => Promise<ILinkListGetAllPublicResponse>;
  linkTagGetAll: (linkTagGetAllRequest: ILinkTagGetAllRequest) => Promise<ILinkTagGetAllResponse>;
  linkNotesGetAll: (linkNotesGetAllRequest: ILinkNotesGetAllPublicRequest) => Promise<ILinkNotesGetAllPublicResponse>;
  linkUsersGetIds: (linkUsersGetIdsRequest: ILinkUsersGetIdsPublicRequest) => Promise<ILinkUsersGetIdsPublicResponse>;
  linkGetVotes: (linkGetVotesRequest: ILinkGetVotesRequest) => Promise<ILinkGetVotesResponse>;
  linkVoteOne: (linkVoteOneRequest: ILinkVoteOneRequest) => Promise<ILinkVoteOneResponse>;
  linkUpsertOne: (linkUpsertOneRequest: ILinkUpsertOneRequest) => Promise<ILinkUpsertOneResponse>;
}
