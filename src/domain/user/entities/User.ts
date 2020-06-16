import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILogOutUserRepo } from '@domain/user/repositories/ILogOutUserRepo';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';
import { IFindUserRepo } from '../repositories/IFindUserRepo';
import { IFindUserRequestDTO } from '../dto/IFindUserRequestDTO';
import { IFindUserResponseDTO } from '../dto/IFindUserResponseDTO';
import { RequestError } from '@shared/errors/RequestError';
import { ICreateUserRepo } from '../repositories/ICreateUserRepo';
import { ICreateUserRequestDTO } from '../dto/ICreateUserRequestDTO';
import { ICreateUserResponseDTO } from '../dto/ICreateUserResponseDTO';

export class User {
  id: string;
  name: string;
  level: string;
  email: string;
  status: number;
  password: number;
  statement: string;
  location: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  loginUserRepo: ILoginUserRepo;
  logOutUserRepo: ILogOutUserRepo;
  createUserRepo: ICreateUserRepo;
  findUserRepo: IFindUserRepo;

  constructor(
    userDTO?,
    loginUserRepo?: ILoginUserRepo,
    logOutUserRepo?: ILogOutUserRepo,
    createUserRepo?: ICreateUserRepo,
    findUserRepo?: IFindUserRepo
  ) {
    this.id = userDTO?.id;
    this.name = userDTO?.name;
    this.level = userDTO?.level;
    this.email = userDTO?.email;
    this.status = userDTO?.status;
    this.statement = userDTO?.statement;
    this.location = userDTO?.location;
    this.password = userDTO?.password;
    this.order = userDTO?.order;
    this.createdAt = userDTO?.createdAt;
    this.updatedAt = userDTO?.updatedAt;

    this.loginUserRepo = loginUserRepo;
    this.logOutUserRepo = logOutUserRepo;
    this.createUserRepo = createUserRepo;
    this.findUserRepo = findUserRepo;
  }

  async authenticate(loginUserDTORequest: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const user = await this.loginUserRepo.authenticateUser(loginUserDTORequest);

    if (!user) throw new RequestError('Name or password incorrect', 401);

    return user;
  }

  async deauthenticate(loginUserDTORequest: ILogOutUserRequestDTO): Promise<ILogOutUserResponseDTO> {
    const user = await this.logOutUserRepo.deauthenticate(loginUserDTORequest);

    return user;
  }

  async find(findUserRequestDTO: IFindUserRequestDTO): Promise<IFindUserResponseDTO> {
    const user = await this.findUserRepo.find(findUserRequestDTO);

    return user;
  }

  async create(createUserDTO: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const user = await this.createUserRepo.create(createUserDTO);

    return user;
  }
}
