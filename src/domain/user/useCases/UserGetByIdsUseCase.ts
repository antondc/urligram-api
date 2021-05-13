import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
import { User } from '../entities/User';
import { IUserGetByIdsRequest } from './interfaces/IUserGetByIdsRequest';
import { IUserGetByIdsResponse } from './interfaces/IUserGetByIdsResponse';

export interface IUserGetByIdsUseCase {
  execute: (userGetByIdsRequest: IUserGetByIdsRequest) => Promise<IUserGetByIdsResponse>;
}

export class UserGetByIdsUseCase implements IUserGetByIdsUseCase {
  private userRepo: IUserRepo;
  private userTagsGetAllUseCase: IUserTagsGetAllUseCase;

  constructor(userRepo: IUserRepo, userTagsGetAllUseCase: IUserTagsGetAllUseCase) {
    this.userRepo = userRepo;
    this.userTagsGetAllUseCase = userTagsGetAllUseCase;
  }

  public async execute(userGetByIdsRequest: IUserGetByIdsRequest): Promise<IUserGetByIdsResponse> {
    const { session, userIds, sort, size, offset } = userGetByIdsRequest;

    const { usersData } = await this.userRepo.userGetByIds({ sessionId: session?.id, userIds, sort, size, offset });

    const usersWithTagsPromises = usersData.map(async (userData) => {
      const user = new User(userData);
      const tags = await this.userTagsGetAllUseCase.execute({ userId: user.id, session, sort: '-count', size: null, offset: null });

      return {
        ...user,
        tags,
      };
    });

    const usersWithTags = await Promise.all(usersWithTagsPromises);

    return usersWithTags;
  }
}
