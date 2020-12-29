import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IUserBookmarkGetOneRequest } from './interfaces/IUserBookmarkGetOneRequest';
import { IUserBookmarkGetOneResponse } from './interfaces/IUserBookmarkGetOneResponse';

export interface IUserBookmarkGetOneUseCase {
  execute: (userBookmarkGetOne: IUserBookmarkGetOneRequest) => Promise<IUserBookmarkGetOneResponse>;
}

export class UserBookmarkGetOneUseCase implements IUserBookmarkGetOneUseCase {
  private userRepo: IUserRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(userRepo: IUserRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.userRepo = userRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(userBookmarkGetOneRequest: IUserBookmarkGetOneRequest): Promise<IUserBookmarkGetOneResponse> {
    const { bookmarkId, session } = userBookmarkGetOneRequest;

    const bookmark = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      bookmarkId,
      userId: session?.id,
    }); // (1)
    if (!bookmark) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: bookmark.linkId, session });

    const bookmarkWithStatistics = {
      ...bookmark,
      statistics,
    };

    return bookmarkWithStatistics;
  }
}
/* --- DOC ---
  Returns a bookmark
  Exceptions
    (1) Bookmark is not owned by user
*/
