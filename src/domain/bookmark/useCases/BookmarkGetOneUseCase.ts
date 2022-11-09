import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { RequestError } from '@shared/errors/RequestError';
import { IBookmarkGetOneRequest } from './interfaces/IBookmarkGetOneRequest';
import { IBookmarkGetOneResponse } from './interfaces/IBookmarkGetOneResponse';

export interface IBookmarkGetOneUseCase {
  execute: (listBookmarkGetOneRequest: IBookmarkGetOneRequest) => Promise<IBookmarkGetOneResponse>;
}

export class BookmarkGetOneUseCase implements IBookmarkGetOneUseCase {
  private bookmarkRepo: IBookmarkRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(bookmarkRepo: IBookmarkRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.bookmarkRepo = bookmarkRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(listBookmarkGetOneRequest: IBookmarkGetOneRequest): Promise<IBookmarkGetOneResponse> {
    const { session, bookmarkId } = listBookmarkGetOneRequest;
    const bookmark = await this.bookmarkRepo.bookmarkGetOne({ bookmarkId, sessionId: session?.id });

    if (!bookmark) throw new RequestError('Bookmark not found', 404, { message: '404 Not found' });

    if (!bookmark.isPublic && session?.id !== bookmark.userId)
      throw new RequestError('You have no permission to retrieve this bookmark', 403, { message: '403 Forbidden' });

    const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: bookmark.linkId, session });

    const bookmarkWithStatistics = {
      ...bookmark,
      statistics,
    };

    return bookmarkWithStatistics;
  }
}

/* --- DOC ---
  Returns a bookmark within a list
  Exceptions:
    (1) The bookmark or the list are private, and the user is not in the list
    (1) The bookmark doesnt exist
*/
