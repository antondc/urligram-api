import { TokenJWT } from '@antoniodcorrea/utils-backend';
import { User } from '@domain/user/entities/User';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserCreateConfirmationRequest } from '@domain/user/useCases/interfaces/IUserCreateConfirmationRequest';
import { IUserCreateConfirmationResponse } from '@domain/user/useCases/interfaces/IUserCreateConfirmationResponse';
import { JWT_SECRET } from '@shared/constants/env';
import { AuthenticationError } from '@shared/errors/AuthenticationError';
import { UserError } from '@shared/errors/UserError';

export interface IUserCreateConfirmationUseCase {
  execute: (userCreateConfirmationRequest: IUserCreateConfirmationRequest) => Promise<IUserCreateConfirmationResponse>;
}

export class UserCreateConfirmationUseCase implements IUserCreateConfirmationUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userCreateConfirmationRequest: IUserCreateConfirmationRequest): Promise<IUserCreateConfirmationResponse> {
    const { name, token } = userCreateConfirmationRequest;

    const tokenService = new TokenJWT(JWT_SECRET);
    const decodedToken = tokenService.decodeToken<User>(token);
    if (decodedToken?.name !== name) throw new AuthenticationError('401 Unauthorized', 401);

    const activatedUser = await this.userRepo.userCreateConfirmation({ token });
    if (!activatedUser?.id) throw new UserError('User not found', 404);

    const userData = await this.userRepo.userGetOne({ userId: activatedUser?.id });
    if (decodedToken?.name !== userData?.name) throw new AuthenticationError('401 Unauthorized', 401);
    if (!userData?.id) throw new UserError('User not found', 404);
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

    return sessionData;
  }
}
