import { PasswordHasher, TokenJWT } from '@antoniodcorrea/utils-backend';
import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { JWT_SECRET } from '@shared/constants/env';
import { AuthenticationError } from '@shared/errors/AuthenticationError';
import { UserError } from '@shared/errors/UserError';
import { IUserResetPasswordRequest } from './interfaces/IUserResetPasswordRequest';
import { IUserResetPasswordResponse } from './interfaces/IUserResetPasswordResponse';

export interface IUserResetPasswordUseCase {
  execute: (userResetPasswordRequest: IUserResetPasswordRequest) => Promise<IUserResetPasswordResponse>;
}

export class UserResetPasswordUseCase implements IUserResetPasswordUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userResetPasswordRequest: IUserResetPasswordRequest): Promise<IUserResetPasswordResponse> {
    const { password, passwordRepeated, name, token } = userResetPasswordRequest;

    if (!name) throw new UserError('User name is missing', 409, 'name');
    if (!password || !passwordRepeated) throw new UserError('One of the passwords is missing', 409, 'password');
    if (password !== passwordRepeated) throw new UserError('Passwords are not equal', 409, 'password');

    const tokenService = new TokenJWT(JWT_SECRET);
    const decodedToken = tokenService.decodeToken<{ name: string }>(token);
    if (decodedToken?.name !== name) throw new AuthenticationError('401 Unauthorized', 401);

    const passwordHasher = new PasswordHasher();
    const passwordBuffer = await passwordHasher.hashPassword(password);
    const hashedPassword = await passwordHasher.bufferToHash(passwordBuffer);

    const userWithPasswordUpdated = await this.userRepo.userResetPassword({ name, token, newPassword: hashedPassword });
    if (!userWithPasswordUpdated?.id) throw new UserError('User not found', 404);

    const userData = await this.userRepo.userGetOne({
      userId: userWithPasswordUpdated?.id,
    });
    const userCredentials = await this.userRepo.userGetCredentials({ userId: userData?.id });

    const user = new User(userData);

    const sessionData = {
      id: user.id,
      order: user.order,
      name: user.name,
      level: user.level,
      accountType: user.accountType,
      email: userCredentials?.email,
      image: user.image,
      status: user.status,
      statement: user.statement,
      location: user.location,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const sessionLogData = {
      result: 'success',
      type: 'reset password',
      userId: sessionData.id,
    };

    await this.userRepo.userLogSession(sessionLogData);

    return sessionData;
  }
}
