import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserFollowerGetAllRequest } from './interfaces/IUserFollowerGetAllRequest';
import { IUserFollowerGetAllResponse } from './interfaces/IUserFollowerGetAllResponse';

export interface IUserFollowerGetAllUseCase {
  execute: (userFollowerGetAllDTO: IUserFollowerGetAllRequest) => Promise<IUserFollowerGetAllResponse>;
}

export class UserFollowerGetAllUseCase implements IUserFollowerGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowerGetAllDTO: IUserFollowerGetAllRequest): Promise<IUserFollowerGetAllResponse> {
    const response = await this.userRepo.userFollowerGetAll(userFollowerGetAllDTO);

    return response;
  }
}
