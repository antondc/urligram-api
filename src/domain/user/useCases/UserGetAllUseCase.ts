import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserGetAllRequest } from './interfaces/IUserGetAllRequest';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';

export interface IUserGetAllUseCase {
  execute: (userGetAllRequest: IUserGetAllRequest) => Promise<IUserGetAllResponse>;
}

export class UserGetAllUseCase implements IUserGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userGetAllRequest: IUserGetAllRequest): Promise<IUserGetAllResponse> {
    const { session } = userGetAllRequest;
    const response = await this.userRepo.userGetAll({ sessionId: session?.id });

    return response;
  }
}
