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
    const response = await this.userRepo.userFollowerGetAll(userFollowerGetAll);

    return response;
  }
}
