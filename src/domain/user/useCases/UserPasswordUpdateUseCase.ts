import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { AuthenticationError } from '@shared/errors/AuthenticationError';
import { UserError } from '@shared/errors/UserError';
import { IUserPasswordUpdateRequest } from './interfaces/IUserPasswordUpdateRequest';
import { IUserPasswordUpdateResponse } from './interfaces/IUserPasswordUpdateResponse';

export interface IUserPasswordUpdateUseCase {
  execute: (userPasswordUpdateRequest: IUserPasswordUpdateRequest) => Promise<IUserPasswordUpdateResponse>;
}

export class UserPasswordUpdateUseCase implements IUserPasswordUpdateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userPasswordUpdateRequest: IUserPasswordUpdateRequest): Promise<IUserPasswordUpdateResponse> {
    const { password, newPassword, newPasswordRepeated, session } = userPasswordUpdateRequest;

    const userAuthenticated = await this.userRepo.userLogin({
      password,
      name: session.name,
    });
    if (!userAuthenticated) throw new AuthenticationError('Username or password not correct', 403);

    const userFound = await this.userRepo.userGetOne({
      sessionId: session?.id,
      userId: userAuthenticated?.id,
    });
    if (!userFound) throw new AuthenticationError('User not found', 404);

    if (!newPassword || !newPasswordRepeated) throw new UserError('One of the passwords is missing', 409);
    if (newPassword !== newPasswordRepeated) throw new UserError('Passwords are not equal', 409);

    await this.userRepo.userPasswordUpdate({ userId: session?.id, newPassword });

    return userFound;
  }
}

// Use case to change password
// This is not to recover password
// User needs to be logged in
