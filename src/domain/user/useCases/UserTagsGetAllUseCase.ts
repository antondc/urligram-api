import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserTagsGetAllRequest } from './interfaces/IUserTagsGetAllRequest';
import { IUserTagsGetAllResponse } from './interfaces/IUserTagsGetAllResponse';

export interface IUserTagsGetAllUseCase {
  execute: (UserTagsGetAllRequest: IUserTagsGetAllRequest) => Promise<IUserTagsGetAllResponse>;
}

export class UserTagsGetAllUseCase implements IUserTagsGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(UserTagsGetAllRequest: IUserTagsGetAllRequest): Promise<IUserTagsGetAllResponse> {
    const { userId, session, sort, size, offset } = UserTagsGetAllRequest;

    const tags = await this.userRepo.userTagsGetAll({ userId, sessionId: session?.id, sort, size, offset });

    return tags;
  }
}
