import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserFollowingGetAllRequest } from './interfaces/IUserFollowingGetAllRequest';
import { IUserFollowingGetAllResponse } from './interfaces/IUserFollowingGetAllResponse';
import { IUserTagsGetAllUseCase } from './UserTagsGetAllUseCase';

export interface IUserFollowingGetAllUseCase {
  execute: (getFollowing: IUserFollowingGetAllRequest) => Promise<IUserFollowingGetAllResponse>;
}

export class UserFollowingGetAllUseCase implements IUserFollowingGetAllUseCase {
  private userRepo: IUserRepo;
  private userTagsGetAllUseCase: IUserTagsGetAllUseCase;

  constructor(userRepo: IUserRepo, userTagsGetAllUseCase: IUserTagsGetAllUseCase) {
    this.userRepo = userRepo;
    this.userTagsGetAllUseCase = userTagsGetAllUseCase;
  }

  public async execute(getFollowing: IUserFollowingGetAllRequest): Promise<IUserFollowingGetAllResponse> {
    const { session, userId, sort, size, offset } = getFollowing;
    const { users, meta } = await this.userRepo.userFollowingGetAll({ sessionId: session?.id, userId, sort, size, offset });

    const usersWithTagsPromises = users.map(async (user) => {
      const tags = await this.userTagsGetAllUseCase.execute({ userId: user.id, session, sort: '-count', size: null, offset: null });

      return {
        ...user,
        tags,
      };
    });

    const usersWithTags = await Promise.all(usersWithTagsPromises);

    return { users: usersWithTags, meta };
  }
}
