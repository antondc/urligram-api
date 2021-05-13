import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
import { User } from '../entities/User';
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
    const { session, sort, size, offset, filter } = userGetAllRequest;

    const { usersData, meta } = await this.userRepo.userGetAll({ sessionId: session?.id, sort, size, offset, filter });

    const usersWithTagsPromises = usersData.map(async (userData) => {
      const user = new User(userData);
      const tags = await this.userTagsGetAllUseCase.execute({ userId: user.id, session, sort: '-count', size: null, offset: null });

      return {
        ...user,
        tags,
      };
    });

    const usersWithTags = await Promise.all(usersWithTagsPromises);

    return {
      users: usersWithTags,
      meta,
    };
  }
}
