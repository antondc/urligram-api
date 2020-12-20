import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserDeleteOneRequest } from './interfaces/IUserDeleteOneRequest';
import { IUserDeleteOneResponse } from './interfaces/IUserDeleteOneResponse';

export interface IUserDeleteOneUseCase {
  execute: (userDeleteOneRequest: IUserDeleteOneRequest) => Promise<IUserDeleteOneResponse>;
}

export class UserDeleteOneUseCase implements IUserDeleteOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userDeleteOneRequest: IUserDeleteOneRequest): Promise<IUserDeleteOneResponse> {
    const { session } = userDeleteOneRequest;

    const userExists = await this.userRepo.userGetOne({ userId: session?.id });
    if (!userExists) throw new RequestError('User does not exist', 404);
    if (userExists.status === 'disabled') throw new RequestError('User was already removed', 409);

    const response = await this.userRepo.userDeleteOne({ userId: session?.id });

    return response;
  }
}
