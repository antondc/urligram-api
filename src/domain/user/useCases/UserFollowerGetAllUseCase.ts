import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { User } from '../entities/User';
import { IUserFollowerGetAllRequest } from './interfaces/IUserFollowerGetAllRequest';
import { IUserFollowerGetAllResponse } from './interfaces/IUserFollowerGetAllResponse';
import { IUserTagsGetAllUseCase } from './UserTagsGetAllUseCase';

export interface IUserFollowerGetAllUseCase {
  execute: (userFollowerGetAll: IUserFollowerGetAllRequest) => Promise<IUserFollowerGetAllResponse>;
}

export class UserFollowerGetAllUseCase implements IUserFollowerGetAllUseCase {
  private userRepo: IUserRepo;
  private userTagsGetAllUseCase: IUserTagsGetAllUseCase;

  constructor(userRepo: IUserRepo, userTagsGetAllUseCase: IUserTagsGetAllUseCase) {
    this.userRepo = userRepo;
    this.userTagsGetAllUseCase = userTagsGetAllUseCase;
  }

  public async execute(userFollowerGetAll: IUserFollowerGetAllRequest): Promise<IUserFollowerGetAllResponse> {
    const { userId, session, sort, size, offset } = userFollowerGetAll;
    const { usersData, meta } = await this.userRepo.userFollowerGetAll({ userId, sessionId: session?.id, sort, size, offset });

    const usersWithTagsPromises = usersData.map(async (userData) => {
      const user = new User(userData);
      const { tags } = await this.userTagsGetAllUseCase.execute({ userId: user.id, session, sort: '-count', size: null, offset: null });

      return {
        ...user,
        tags,
      };
    });

    const usersWithTags = await Promise.all(usersWithTagsPromises);

    return { users: usersWithTags, meta };
  }
}
