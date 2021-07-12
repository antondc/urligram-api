import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { User } from '../entities/User';
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
    const { session, userId, sort, size, offset } = getFollowing;
    const { usersData, meta } = await this.userRepo.userFollowingGetAll({ sessionId: session?.id, userId, sort, size, offset });

    const users = usersData.map((userData) => new User(userData));

    return { users, meta };
  }
}
