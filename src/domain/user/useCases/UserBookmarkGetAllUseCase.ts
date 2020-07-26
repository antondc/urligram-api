import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkGetAllRequest } from './interfaces/IUserBookmarkGetAllRequest';
import { IUserBookmarkGetAllResponse } from './interfaces/IUserBookmarkGetAllResponse';

export interface IUserBookmarkGetAllUseCase {
  execute: (userBookmarkGetAllRequest: IUserBookmarkGetAllRequest) => Promise<IUserBookmarkGetAllResponse>;
}

export class UserBookmarkGetAllUseCase implements IUserBookmarkGetAllUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkGetAllRequest: IUserBookmarkGetAllRequest): Promise<IUserBookmarkGetAllResponse> {
    const { userId, session } = userBookmarkGetAllRequest;

    const response = await this.userRepo.userBookmarkGetAll({ userId });
    const filteredResponse = response.filter((item) => session?.id === userId || !item.isPrivate); // (1) (2)

    return filteredResponse;
  }
}

/* --- DOC ---
  Returns a collection of bookmarks
  Returns when:
    (1) Bookmark is public
    (2) Bookmark is owned by user
  Exceptions:
*/
