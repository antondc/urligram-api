import { User } from '@domain/user/entities/User';

export interface IUserRepo {
  userCreate: (userCreateDTO) => Promise<User>;
  userGetAll: () => Promise<User[]>;
  userGetOne: (findUserDTO) => Promise<User>;
  followingGetAll: (userDTO) => Promise<User>;
  getFollowers: (userDTO) => Promise<User>;
  userFollowingCreate: (userFollowingCreateDTO) => Promise<User>;
  followDeleteUser: (followDeleteUserDTO) => Promise<User>;
  authenticate: (loginUserDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
