import { Link } from '@domain/link/entities/Link';
import { List } from '@domain/list/entities/List';
import { User } from '@domain/user/entities/User';
import { IUserLinkGetOneRequest } from './types/IUserLinkGetOneRequest';
import { IUserLinkGetOneResponse } from './types/IUserLinkGetOneResponse';

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
  userListGetAll: (userListGetAllRequestDTO: { userId: string }) => Promise<List[]>;
  authenticate: (userLoginDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
