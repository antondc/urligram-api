import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserBookmarkGetOneRequest } from './interfaces/IUserBookmarkGetOneRequest';
import { IUserBookmarkGetOneResponse } from './interfaces/IUserBookmarkGetOneResponse';

export interface IUserBookmarkGetOneUseCase {
  execute: (userBookmarkGetOne: IUserBookmarkGetOneRequest) => Promise<IUserBookmarkGetOneResponse>;
}

export class UserBookmarkGetOneUseCase implements IUserBookmarkGetOneUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkGetOneRequest: IUserBookmarkGetOneRequest): Promise<IUserBookmarkGetOneResponse> {
    const { bookmarkId, session } = userBookmarkGetOneRequest;

    const response = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId,
      userId: session?.id,
    }); // (1)
    if (!response) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    return response;
  }
}
/* --- DOC ---
  Returns a bookmark
  Exceptions
    (1) Bookmark is not owned by user
*/
