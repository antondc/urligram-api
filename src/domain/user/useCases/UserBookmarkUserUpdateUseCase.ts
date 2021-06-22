import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkUserUpdateRequest } from './interfaces/IUserBookmarkUserUpdateRequest';
import { IUserBookmarkUserUpdateResponse } from './interfaces/IUserBookmarkUserUpdateResponse';

export interface IUserBookmarkUserUpdateUseCase {
  execute: (userBookmarkUserUpdateRequest: IUserBookmarkUserUpdateRequest) => Promise<IUserBookmarkUserUpdateResponse>;
}

export class UserBookmarkUserUpdateUseCase implements IUserBookmarkUserUpdateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkUserUpdateRequest: IUserBookmarkUserUpdateRequest): Promise<IUserBookmarkUserUpdateResponse> {
    const { session, bookmarkId } = userBookmarkUserUpdateRequest;
    try {
      this.userRepo.userBookmarkUserUpdate({
        userId: session?.id,
        bookmarkId,
        viewed: true,
      });
    } catch (error) {}

    return {
      bookmarkId,
      userId: session?.id,
      viewed: true,
    };
  }
}
