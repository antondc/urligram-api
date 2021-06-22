import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkUserSentGetAllRequest } from './interfaces/IUserBookmarkUserSentGetAllRequest';
import { IUserBookmarkUserSentGetAllResponse } from './interfaces/IUserBookmarkUserSentGetAllResponse';

export interface IUserBookmarkUserSentGetAllUseCase {
  execute: (userBookmarkUserSentGetAllRequest: IUserBookmarkUserSentGetAllRequest) => Promise<IUserBookmarkUserSentGetAllResponse>;
}

export class UserBookmarkUserSentGetAllUseCase implements IUserBookmarkUserSentGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkUserSentGetAllRequest: IUserBookmarkUserSentGetAllRequest): Promise<IUserBookmarkUserSentGetAllResponse> {
    const { session } = userBookmarkUserSentGetAllRequest;
    const bookmarks = await this.userRepo.userBookmarkUserSentGetAll({
      sessionId: session?.id,
    });

    return bookmarks;
  }
}
