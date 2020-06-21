import { ICreateUserRequestDTO } from '@domain/user/dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '@domain/user/dto/ICreateUserResponseDTO';
import { IFindUserRequestDTO } from '@domain/user/dto/IFindUserRequestDTO';
import { IFindUserResponseDTO } from '@domain/user/dto/IFindUserResponseDTO';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';

export interface IUserRepo {
  create: (createUserDTO: ICreateUserRequestDTO) => Promise<ICreateUserResponseDTO>;
  find: (findUserDTO: IFindUserRequestDTO) => Promise<IFindUserResponseDTO>;
  authenticate: (loginUserDTO: ILoginUserRequestDTO) => Promise<ILoginUserResponseDTO>;
  deauthenticate: (loginUserDTO: ILogOutUserRequestDTO) => Promise<ILogOutUserResponseDTO>;
}
