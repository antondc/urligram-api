import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserFollowingGetOneRequest } from './interfaces/IUserFollowingGetOneRequest';
import { IUserFollowingGetOneResponse } from './interfaces/IUserFollowingGetOneResponse';

export interface IUserFollowingGetOneUseCase {
  execute: (userFollowingGetOneDTO: IUserFollowingGetOneRequest) => Promise<IUserFollowingGetOneResponse>;
}

export class UserFollowingGetOneUseCase implements IUserFollowingGetOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowingGetOneRequest: IUserFollowingGetOneRequest): Promise<IUserFollowingGetOneResponse> {
    const { session, followedId } = userFollowingGetOneRequest;

    const isFollowing = await this.userRepo.userFollowingGetOne({ followedId, userId: session.id });

    if (!isFollowing) throw new RequestError('User following not found', 404, { message: '404 Not Found' });

    const response = await this.userRepo.userGetOne({ userId: isFollowing?.userId });

    return response;
  }
}
