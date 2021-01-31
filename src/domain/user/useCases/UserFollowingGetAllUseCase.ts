import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserFollowingGetAllRequest } from './interfaces/IUserFollowingGetAllRequest';
import { IUserFollowingGetAllResponse } from './interfaces/IUserFollowingGetAllResponse';

export interface IUserFollowingGetAllUseCase {
  execute: (getFollowing: IUserFollowingGetAllRequest) => Promise<IUserFollowingGetAllResponse>;
}

export class UserFollowingGetAllUseCase implements IUserFollowingGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(getFollowing: IUserFollowingGetAllRequest): Promise<IUserFollowingGetAllResponse> {
    const { userId, sort, size, offset } = getFollowing;
    const response = await this.userRepo.userFollowingGetAll({ userId, sort, size, offset });

    return response;
  }
}
