import { User } from '@domain/user/entities/User';
import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';
import { ILogOutUserRepo } from '../repositories/ILogOutUserRepo';

export interface ILogOutUserUseCase {
  execute: (logOutUserDTO: ILogOutUserRequestDTO) => Promise<ILogOutUserResponseDTO>;
}

export class LogOutUserUseCase {
  logOutUserRepo: ILogOutUserRepo;

  constructor(logOutUserRepo: ILogOutUserRepo) {
    this.logOutUserRepo = logOutUserRepo;
  }

  public async execute(logOutUserDTO: ILogOutUserRequestDTO): Promise<ILogOutUserResponseDTO> {
    const user = await new User(undefined, undefined, this.logOutUserRepo);

    const response = await user.deauthenticate(logOutUserDTO);

    return response;
  }
}
