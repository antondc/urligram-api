import { Link } from '@domain/link/entities/Link';
import { List } from '@domain/list/entities/List';
import { User } from '@domain/user/entities/User';
import { IUserLinkCreateRequest } from './types/IUserLinkCreateRequest';
import { IUserLinkCreateResponse } from './types/IUserLinkCreateResponse';
import { IUserLinkDeleteRequest } from './types/IUserLinkDeleteRequest';
import { IUserLinkDeleteResponse } from './types/IUserLinkDeleteResponse';
import { IUserLinkGetOneRequest } from './types/IUserLinkGetOneRequest';
import { IUserLinkGetOneResponse } from './types/IUserLinkGetOneResponse';
import { IUserLinkUpdateRequest } from './types/IUserLinkUpdateRequest';
import { IUserLinkUpdateResponse } from './types/IUserLinkUpdateResponse';

export interface IUserRepo {
  userGetAll: () => Promise<User[]>;
  userGetOne: (findUserDTO) => Promise<User>;
  userCreate: (userCreateDTO) => Promise<User>;
  userUpdate: (userUpdateDTO) => Promise<User>;
  userDelete: (userDeleteDTO) => Promise<User>;
  userUpdatePassword: (userUpdatePasswordDTO) => Promise<User>;
  userFollowingCreate: (userFollowingCreateDTO) => Promise<User>;
  userFollowingGetAll: (userFollowingGetAllDTO) => Promise<User[]>;
  userFollowingDelete: (userFollowingDeleteDTO) => Promise<User>;
  userFollowersGetAll: (userFollowersGetAllDTO) => Promise<User[]>;
  userLinkGetOne: (userLinkGetOneRequestDTO: IUserLinkGetOneRequest) => Promise<IUserLinkGetOneResponse>;
  userLinkGetAll: (userLinkGetAllRequestDTO) => Promise<Link[]>;
  userLinkCreate: (userlinkCreateRequest: IUserLinkCreateRequest) => Promise<IUserLinkCreateResponse>;
  userLinkUpdate: (userLinkUpdateRequestDTO: IUserLinkUpdateRequest) => Promise<IUserLinkUpdateResponse>;
  userLinkDelete: (userLinkDeleteRequestDTO: IUserLinkDeleteRequest) => Promise<IUserLinkDeleteResponse>;
  userListGetAll: (userListGetAllRequestDTO: { userId: string }) => Promise<List[]>;
  authenticate: (userLoginDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
