import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';
import { IUserRepo } from '../repositories/IUserRepo';

export interface ILogOutUserUseCase {
  execute: (logOutUserDTO: ILogOutUserRequestDTO) => Promise<ILogOutUserResponseDTO>;
}

export class LogOutUserUseCase implements ILogOutUserUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(logOutUserDTO: ILogOutUserRequestDTO): Promise<ILogOutUserResponseDTO> {

    const response = await this.userRepo.deauthenticate(logOutUserDTO);

    return response;
  }
}
