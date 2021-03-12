import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserCreateConfirmationRequest } from '@domain/user/useCases/interfaces/IUserCreateConfirmationRequest';
import { IUserCreateConfirmationResponse } from '@domain/user/useCases/interfaces/IUserCreateConfirmationResponse';
import { TokenService } from '@infrastructure/services/TokenService';
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

    const tokenService = new TokenService();
    const decodedToken = tokenService.decodeToken(token) as { name: string };
    if (decodedToken?.name !== name) throw new AuthenticationError('401 Unauthorized', 401);

    const activatedUser = await this.userRepo.userCreateConfirmation({ token });
    if (!activatedUser?.id) throw new UserError('User not found', 404);

    const user = await this.userRepo.userGetOne({ userId: activatedUser?.id });
    if (decodedToken?.name !== user?.name) throw new AuthenticationError('401 Unauthorized', 401);
    if (!user?.id) throw new UserError('User not found', 404);

    return {
      id: user?.id,
      name: user?.name,
      level: user?.level,
      email: user?.email,
      status: user?.status,
      image: user?.image,
      statement: user?.statement,
      location: user?.location,
      order: user?.order,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  }
}
