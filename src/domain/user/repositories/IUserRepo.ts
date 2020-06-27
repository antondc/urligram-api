import { User } from '@domain/user/entities/User';

export interface IUserRepo {
  create: (createUserDTO) => Promise<User>;
  getOne: (findUserDTO) => Promise<User>;
  getAll: () => Promise<User[]>;
  followingGetAll: (userDTO) => Promise<User>;
  getFollowers: (userDTO) => Promise<User>;
  followUser: (followUserDTO) => Promise<User>;
  followDeleteUser: (followDeleteUserDTO) => Promise<User>;
  authenticate: (loginUserDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
