import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { User } from '../entities/User';
import { IFindUserRequestDTO } from '@domain/user/dto/IFindUserRequestDTO';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';

export interface IUserRepo {
  create: (createUserDTO: ICreateUserRequestDTO) => Promise<User>;
  find: (findUserDTO: IFindUserRequestDTO) => Promise<User>;
  authenticate: (loginUserDTO: ILoginUserRequestDTO) => Promise<User>;
  deauthenticate: (loginUserDTO: ILogOutUserRequestDTO) => Promise<ILogOutUserRequestDTO>;
  logSession: (logData: { result: string; type: string; id: string }) => Promise<any>;
}
