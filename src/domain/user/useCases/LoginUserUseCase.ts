import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { IUserRepo } from '../repositories/IUserRepo';
import { AuthenticationError } from '@shared/errors/AuthenticationError';

export interface ILoginUserUseCase {
  execute: (loginUserDTO: ILoginUserRequestDTO) => Promise<ILoginUserResponseDTO>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(loginUserDTO: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const userAuthenticated = await this.userRepo.authenticate(loginUserDTO);
    const userFound = await this.userRepo.find(loginUserDTO);

    if (userAuthenticated) {
      const logSessionData = {
        result: 'success',
        type: 'login',
        id: userFound.id,
      };

      await this.userRepo.logSession(logSessionData);

      return userAuthenticated;
    } else if (!userAuthenticated && userFound) {
      const logSessionData = {
        result: 'failure',
        type: 'login',
        id: userFound.id,
      };

      await this.userRepo.logSession(logSessionData);

      throw new AuthenticationError('Username or password not correct', 500);
    } else if (!userFound) {
      throw new AuthenticationError('User not found', 500);
    }
  }
}
