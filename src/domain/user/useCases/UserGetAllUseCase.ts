import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
import { IUserGetAllRequest } from './interfaces/IUserGetAllRequest';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';

export interface IUserGetAllUseCase {
  execute: (userGetAllRequest: IUserGetAllRequest) => Promise<IUserGetAllResponse>;
}

export class UserGetAllUseCase implements IUserGetAllUseCase {
  private userRepo: IUserRepo;
  private userTagsGetAllUseCase: IUserTagsGetAllUseCase;

  constructor(userRepo: IUserRepo, userTagsGetAllUseCase: IUserTagsGetAllUseCase) {
    this.userRepo = userRepo;
    this.userTagsGetAllUseCase = userTagsGetAllUseCase;
  }

  public async execute(userGetAllRequest: IUserGetAllRequest): Promise<IUserGetAllResponse> {
    const { session } = userGetAllRequest;
    const users = await this.userRepo.userGetAll({ sessionId: session?.id });

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
