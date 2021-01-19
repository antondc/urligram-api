import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserFollowingCreateRequest } from './interfaces/IUserFollowingCreateRequest';
import { IUserFollowingCreateResponse } from './interfaces/IUserFollowingCreateResponse';

export interface IUserFollowingCreateUseCase {
  execute: (userFollowRequest: IUserFollowingCreateRequest) => Promise<IUserFollowingCreateResponse>;
}

export class UserFollowingCreateUseCase implements IUserFollowingCreateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userFollowingCreateRequest: IUserFollowingCreateRequest): Promise<IUserFollowingCreateResponse> {
    const { session, followedId } = userFollowingCreateRequest;
    const isAlreadyFollowing = await this.userRepo.userFollowingGetOne({ followedId, userId: session.id });
    if (!!isAlreadyFollowing) throw new RequestError('Already following this user', 409, { message: '409 Conflict' });

    await this.userRepo.userFollowingCreate({ followedId, userId: session?.id });

    const isFollowing = await this.userRepo.userFollowingGetOne({ followedId, userId: session.id });

    if (!isFollowing) throw new RequestError('User creation failed', 409, { message: '409 Conflict' });

    const response = await this.userRepo.userGetOne({ sessionId: session?.id, userId: isFollowing?.userId });

    return response;
  }
}
