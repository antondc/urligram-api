import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserFollowerGetAllRequest } from './interfaces/IUserFollowerGetAllRequest';
import { IUserFollowerGetAllResponse } from './interfaces/IUserFollowerGetAllResponse';

export interface IUserFollowerGetAllUseCase {
  execute: (userFollowerGetAll: IUserFollowerGetAllRequest) => Promise<IUserFollowerGetAllResponse>;
}

export class UserFollowerGetAllUseCase implements IUserFollowerGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowerGetAll: IUserFollowerGetAllRequest): Promise<IUserFollowerGetAllResponse> {
    const { userId, session, sort, size, offset } = userFollowerGetAll;
    const response = await this.userRepo.userFollowerGetAll({ userId, sessionId: session?.id, sort, size, offset });

    return response;
  }
}
