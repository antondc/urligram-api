import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
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

    const users = await this.userRepo.userGetByIds({ sessionId: session?.id, userIds, sort, size, offset });

    const usersWithTagsPromises = users.map(async (user) => {
      const tags = await this.userTagsGetAllUseCase.execute({ userId: user.id, session });

      return {
        ...user,
        tags,
      };
    });

    const usersWithTags = await Promise.all(usersWithTagsPromises);

    return usersWithTags;
  }
}
