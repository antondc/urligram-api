import { User } from '@domain/user/entities/User';

export interface IUserRepo {
  userCreate: (userCreateDTO) => Promise<User>;
  userGetAll: () => Promise<User[]>;
  userGetOne: (findUserDTO) => Promise<User>;
  userFollowingGetAll: (userFollowingGetAllDTO) => Promise<User>;
  userFollowingCreate: (userFollowingCreateDTO) => Promise<User>;
  userFollowingDelete: (userFollowingDeleteDTO) => Promise<User>;
  userFollowersGetAll: (userFollowersGetAllDTO) => Promise<User>;
  authenticate: (userLoginDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
