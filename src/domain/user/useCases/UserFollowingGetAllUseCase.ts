import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserFollowingGetAllRequest } from './interfaces/IUserFollowingGetAllRequest';
import { IUserFollowingGetAllResponse } from './interfaces/IUserFollowingGetAllResponse';

export interface IUserFollowingGetAllUseCase {
  execute: (getFollowingDTO: IUserFollowingGetAllRequest) => Promise<IUserFollowingGetAllResponse>;
}

export class UserFollowingGetAllUseCase implements IUserFollowingGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(getFollowingDTO: IUserFollowingGetAllRequest): Promise<IUserFollowingGetAllResponse> {
    const response = await this.userRepo.userFollowingGetAll(getFollowingDTO);

    return response;
  }
}
