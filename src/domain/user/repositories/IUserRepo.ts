import { Link } from '@domain/link/entities/Link';
import { List } from '@domain/list/entities/List';
import { User } from '@domain/user/entities/User';

export interface IUserRepo {
  userCreate: (userCreateDTO) => Promise<User>;
  userGetAll: () => Promise<User[]>;
  userGetOne: (findUserDTO) => Promise<User>;
  userFollowingCreate: (userFollowingCreateDTO) => Promise<User>;
  userFollowingGetAll: (userFollowingGetAllDTO) => Promise<User[]>;
  userFollowingDelete: (userFollowingDeleteDTO) => Promise<User>;
  userFollowersGetAll: (userFollowersGetAllDTO) => Promise<User[]>;
  userLinkGetAll: (userLinkGetAllRequestDTO) => Promise<Link[]>;
  userListGetAll: (userListGetAllRequestDTO) => Promise<List[]>;
  authenticate: (userLoginDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
