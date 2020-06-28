import { IUserLoginRequestDTO } from '@domain/user/dto/IUserLoginRequestDTO';
import { IUserLoginResponseDTO } from '@domain/user/dto/IUserLoginResponseDTO';
import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { AuthenticationError } from '@shared/errors/AuthenticationError';

export interface IUserLoginUseCase {
  execute: (userLoginDTO: IUserLoginRequestDTO) => Promise<User>;
}

export class UserLoginUseCase implements IUserLoginUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userLoginDTO: IUserLoginRequestDTO): Promise<IUserLoginResponseDTO> {
    const userAuthenticated = await this.userRepo.authenticate(userLoginDTO);
    const userFound = await this.userRepo.userGetOne(userLoginDTO);

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
