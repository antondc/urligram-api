import { URLWrapper } from '@infrastructure/services/UrlWrapper';
import { RequestError } from '@shared/errors/RequestError';
import { IUserRepo } from '../repositories/IUserRepo';
import { IUserBookmarkUpdateRequest } from './interfaces/IUserBookmarkUpdateRequest';
import { IUserBookmarkUpdateResponse } from './interfaces/IUserBookmarkUpdateResponse';

export interface IUserBookmarkUpdateUseCase {
  execute: (userBookmarkUpdateRequest: IUserBookmarkUpdateRequest) => Promise<IUserBookmarkUpdateResponse>;
}

export class UserBookmarkUpdateUseCase implements IUserBookmarkUpdateUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(userBookmarkUpdateRequest: IUserBookmarkUpdateRequest): Promise<IUserBookmarkUpdateResponse> {
    const { session, bookmarkId, order, title, url, saved, isPrivate, tags } = userBookmarkUpdateRequest;
    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getDomain();
    const path = parsedUrl.getPath() + parsedUrl.getSearch();

    const bookmarkExists = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId,
      userId: session?.id,
    });
    if (!bookmarkExists) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' }); // (1)(2)

    const result = await this.userRepo.userBookmarkUpdate({
      userId: session?.id,
      bookmarkId,
      order,
      title,
      saved,
      isPrivate,
      domain,
      path,
      tags,
    });

    const response = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId: result.bookmarkId,
      userId: session?.id,
    });

    return response;
  }
}
/* --- DOC ---
  Deletes a bookmark
  Exceptions
    (1) Bookmark is not owned by user
*/
