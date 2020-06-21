import { User } from '@domain/user/entities/User';

export interface IUserRepo {
  create: (createUserDTO) => Promise<User>;
  find: (findUserDTO) => Promise<User>;
  authenticate: (loginUserDTO) => Promise<User>;
  logSession: (sessionLogData: { result: string; type: string; id: string }) => Promise<void>;
}
