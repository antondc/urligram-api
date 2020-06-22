import { ILogOutUserRequestDTO } from '@domain/user/dto/ILogOutUserRequestDTO';
import { ILogOutUserResponseDTO } from '@domain/user/dto/ILogOutUserResponseDTO';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';

export interface ILogOutUserUseCase {
  execute: (logOutUserDTO: ILogOutUserRequestDTO) => Promise<ILogOutUserResponseDTO>;
}

export class LogOutUserUseCase implements ILogOutUserUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(logOutUserDTO: ILogOutUserRequestDTO): Promise<ILogOutUserResponseDTO> {
    const sessionLogData = {
      result: 'success',
      type: 'logout',
      id: logOutUserDTO.id,
    };

    await this.userRepo.logSession(sessionLogData);
    const result = {
      id: logOutUserDTO.id,
    };

    return result;
  }
}
