import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserTagsGetAllUseCase } from '@domain/user/useCases/UserTagsGetAllUseCase';
import { User } from '../entities/User';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';

export interface IUserGetOneUseCase {
  execute: (userGetOneRequest: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
}

export class UserGetOneUseCase implements IUserGetOneUseCase {
  private userRepo: IUserRepo;
  private userTagsGetAllUseCase: IUserTagsGetAllUseCase;

  constructor(userRepo: IUserRepo, userTagsGetAllUseCase: IUserTagsGetAllUseCase) {
    this.userRepo = userRepo;
    this.userTagsGetAllUseCase = userTagsGetAllUseCase;
  }

  public async execute(userGetOneRequest: IUserGetOneRequest): Promise<IUserGetOneResponse> {
    const { session, userId, email, name } = userGetOneRequest;
    const tags = await this.userTagsGetAllUseCase.execute({ userId, session, sort: '-count', size: null, offset: null });

    const userData = await this.userRepo.userGetOne({ sessionId: session?.id, userId, name, email });
    const user = new User(userData);

    const userWithTags = {
      ...user,
      tags,
    };

    return userWithTags;
  }
}
