import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { AuthenticationError } from '@shared/errors/AuthenticationError';
import { IUserLoginRequest } from './interfaces/IUserLoginRequest';
import { IUserLoginResponse } from './interfaces/IUserLoginResponse';

export interface IUserLoginUseCase {
  execute: (userLogin: IUserLoginRequest) => Promise<User>;
}

export class UserLoginUseCase implements IUserLoginUseCase {
  userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userLogin: IUserLoginRequest): Promise<IUserLoginResponse> {
    const { nameOrEmail, password } = userLogin;

    const user = await this.userRepo.userGetOne({ name: nameOrEmail, email: nameOrEmail });
    if (!user) throw new AuthenticationError('User doesn’t exist', 500, 'nameOrEmail');

    const userAuthenticated = await this.userRepo.userLogin({ nameOrEmail, password });
    if (!userAuthenticated) throw new AuthenticationError('Password not correct', 500, 'password');

    const sessionLogData = {
      result: 'success',
      type: 'login',
      userId: userAuthenticated.id,
    };

    await this.userRepo.userLogSession(sessionLogData);

    return userAuthenticated;
  }
}
