import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkUserReceivedGetAllRequest } from './interfaces/IUserBookmarkUserReceivedGetAllRequest';
import { IUserBookmarkUserReceivedGetAllResponse } from './interfaces/IUserBookmarkUserReceivedGetAllResponse';

export interface IUserBookmarkUserReceivedGetAllUseCase {
  execute: (userBookmarkUserReceivedGetAllRequest: IUserBookmarkUserReceivedGetAllRequest) => Promise<IUserBookmarkUserReceivedGetAllResponse>;
}

export class UserBookmarkUserReceivedGetAllUseCase implements IUserBookmarkUserReceivedGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkUserReceivedGetAllRequest: IUserBookmarkUserReceivedGetAllRequest): Promise<IUserBookmarkUserReceivedGetAllResponse> {
    const { session } = userBookmarkUserReceivedGetAllRequest;

    const bookmarks = await this.userRepo.userBookmarkUserReceivedGetAll({
      sessionId: session?.id,
    });

    return bookmarks;
  }
}
