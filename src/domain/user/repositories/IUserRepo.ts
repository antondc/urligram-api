import { Link } from '@domain/link/entities/Link';
import { User } from '@domain/user/entities/User';
import { IUserLinkGetAllRequestDTO } from '../dto/IUserLinkGetAllRequestDTO';

export interface IUserRepo {
  userCreate: (userCreateDTO) => Promise<User>;
  userGetAll: () => Promise<User[]>;
  userGetOne: (findUserDTO) => Promise<User>;
  userFollowingCreate: (userFollowingCreateDTO) => Promise<User>;
  userFollowingGetAll: (userFollowingGetAllDTO) => Promise<User[]>;
  userFollowingDelete: (userFollowingDeleteDTO) => Promise<User>;
  userFollowersGetAll: (userFollowersGetAllDTO) => Promise<User[]>;
  userLinkGetAll: (userLinkGetAllRequestDTO: IUserLinkGetAllRequestDTO) => Promise<Link[]>;
  authenticate: (userLoginDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
