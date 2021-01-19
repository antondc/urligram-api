import { ITagGetAllByUserIdUseCase } from '@domain/tag/useCases/TagGetAllByUserIdUseCase';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserGetOneRequest } from './interfaces/IUserGetOneRequest';
import { IUserGetOneResponse } from './interfaces/IUserGetOneResponse';

export interface IUserGetOneUseCase {
  execute: (userGetOneRequest: IUserGetOneRequest) => Promise<IUserGetOneResponse>;
}

export class UserGetOneUseCase implements IUserGetOneUseCase {
  private userRepo: IUserRepo;
  private tagGetAllByUserIdUseCase: ITagGetAllByUserIdUseCase;

  constructor(userRepo: IUserRepo, tagGetAllByUserIdUseCase: ITagGetAllByUserIdUseCase) {
    this.userRepo = userRepo;
    this.tagGetAllByUserIdUseCase = tagGetAllByUserIdUseCase;
  }

  public async execute(userGetOneRequest: IUserGetOneRequest): Promise<IUserGetOneResponse> {
    const { session, userId, email, name } = userGetOneRequest;
    const tags = await this.tagGetAllByUserIdUseCase.execute({ userId, session });

    const user = await this.userRepo.userGetOne({ sessionId: session?.id, userId, name, email });

    const userWithTags = {
      ...user,
      tags,
    };

    return userWithTags;
  }
}
