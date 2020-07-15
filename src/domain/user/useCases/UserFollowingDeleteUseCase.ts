import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserFollowingDeleteRequest } from './interfaces/IUserFollowingDeleteRequest';
import { IUserFollowingDeleteResponse } from './interfaces/IUserFollowingDeleteResponse';

export interface IUserFollowingDeleteUseCase {
  execute: (userFollowingDeleteRequestDTO: IUserFollowingDeleteRequest) => Promise<IUserFollowingDeleteResponse>;
}

export class UserFollowingDeleteUseCase implements IUserFollowingDeleteUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowingDeleteRequestDTO: IUserFollowingDeleteRequest): Promise<IUserFollowingDeleteResponse> {
    const { session } = userFollowingDeleteRequestDTO;
    const response = await this.userRepo.userFollowingDelete({ ...userFollowingDeleteRequestDTO, userId: session?.id });

    return response;
  }
}
