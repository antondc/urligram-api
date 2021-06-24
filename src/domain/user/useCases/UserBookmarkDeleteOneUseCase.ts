import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserBookmarkDeleteOneRequest } from './interfaces/IUserBookmarkDeleteOneRequest';
import { IUserBookmarkDeleteOneResponse } from './interfaces/IUserBookmarkDeleteOneResponse';

export interface IUserBookmarkDeleteOneUseCase {
  execute: (userBookmarkDeleteOneRequest: IUserBookmarkDeleteOneRequest) => Promise<IUserBookmarkDeleteOneResponse>;
}

export class UserBookmarkDeleteOneUseCase implements IUserBookmarkDeleteOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkDeleteOneRequest: IUserBookmarkDeleteOneRequest): Promise<IUserBookmarkDeleteOneResponse> {
    const { bookmarkId, session } = userBookmarkDeleteOneRequest;

    const result = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      sessionId: session?.id,
      bookmarkId,
      userId: session?.id,
    });
    if (!result) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' }); // (1)

    const response = await this.userRepo.userBookmarkDeleteOne({ bookmarkId });

    return response;
  }
}

/* --- DOC ---
  Deletes a bookmark:
  Exceptions
    (1) Bookmark doesn't exist for this user
*/
