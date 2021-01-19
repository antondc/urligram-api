import { ITagGetAllByUserIdUseCase } from '@domain/tag/useCases/TagGetAllByUserIdUseCase';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserGetAllRequest } from './interfaces/IUserGetAllRequest';
import { IUserGetAllResponse } from './interfaces/IUserGetAllResponse';

export interface IUserGetAllUseCase {
  execute: (userGetAllRequest: IUserGetAllRequest) => Promise<IUserGetAllResponse>;
}

export class UserGetAllUseCase implements IUserGetAllUseCase {
  private userRepo: IUserRepo;
  private tagGetAllByUserIdUseCase: ITagGetAllByUserIdUseCase;

  constructor(userRepo: IUserRepo, tagGetAllByUserIdUseCase: ITagGetAllByUserIdUseCase) {
    this.userRepo = userRepo;
    this.tagGetAllByUserIdUseCase = tagGetAllByUserIdUseCase;
  }

  public async execute(userGetAllRequest: IUserGetAllRequest): Promise<IUserGetAllResponse> {
    const { session } = userGetAllRequest;
    const users = await this.userRepo.userGetAll({ sessionId: session?.id });

    const usersWithTagsPromises = users.map(async (user) => {
      const tags = await this.tagGetAllByUserIdUseCase.execute({ userId: user.id, session });

      return {
        ...user,
        tags,
      };
    });

    const usersWithTags = await Promise.all(usersWithTagsPromises);

    return usersWithTags;
  }
}
