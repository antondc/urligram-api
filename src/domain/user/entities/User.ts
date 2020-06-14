import { ILoginUserRepo } from '@domain/user/repositories/ILoginUserRepo';
import { ILogOutUserRepo } from '@domain/user/repositories/ILogOutUserRepo';
import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';

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

  constructor(userDTO?, loginUserRepo?: ILoginUserRepo, logOutUserRepo?: ILogOutUserRepo) {
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
  }

  async authenticate(loginUserDTORequest: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const user = await this.loginUserRepo.authenticateUser(loginUserDTORequest);

    return user;
  }

  async deauthenticate(loginUserDTORequest: ILogOutUserRequestDTO): Promise<ILogOutUserResponseDTO> {
    const user = await this.logOutUserRepo.deauthenticate(loginUserDTORequest);

    return user;
  }
}
