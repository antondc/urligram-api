import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserFollowingDeleteRequest } from './interfaces/IUserFollowingDeleteRequest';
import { IUserFollowingDeleteResponse } from './interfaces/IUserFollowingDeleteResponse';

export interface IUserFollowingDeleteUseCase {
  execute: (userFollowingDeleteRequest: IUserFollowingDeleteRequest) => Promise<IUserFollowingDeleteResponse>;
}

export class UserFollowingDeleteUseCase implements IUserFollowingDeleteUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowingDeleteRequest: IUserFollowingDeleteRequest): Promise<IUserFollowingDeleteResponse> {
    const { session } = userFollowingDeleteRequest;
    const response = await this.userRepo.userFollowingDelete({ ...userFollowingDeleteRequest, userId: session?.id });

    return response;
  }
}
