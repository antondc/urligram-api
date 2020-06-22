import { ILoginUserRequestDTO } from '@domain/user/dto/ILoginUserRequestDTO';
import { ILoginUserResponseDTO } from '@domain/user/dto/ILoginUserResponseDTO';
import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { AuthenticationError } from '@shared/errors/AuthenticationError';

export interface ILoginUserUseCase {
  execute: (loginUserDTO: ILoginUserRequestDTO) => Promise<User>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(loginUserDTO: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const userAuthenticated = await this.userRepo.authenticate(loginUserDTO);
    const userFound = await this.userRepo.getOne(loginUserDTO);

    if (userAuthenticated) {
      const sessionLogData = {
        result: 'success',
        type: 'login',
        id: userFound.id,
      };

      await this.userRepo.logSession(sessionLogData);

      return userAuthenticated;
    } else if (!userAuthenticated && userFound) {
      const sessionLogData = {
        result: 'failure',
        type: 'login',
        id: userFound.id,
      };

      await this.userRepo.logSession(sessionLogData);

      throw new AuthenticationError('Username or password not correct', 500);
    } else if (!userFound) {
      throw new AuthenticationError('User not found', 500);
    }
  }
}
