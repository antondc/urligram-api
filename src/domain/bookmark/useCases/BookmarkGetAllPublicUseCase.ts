import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IBookmarkGetAllPublicRequest } from './interfaces/IBookmarkGetAllPublicRequest';
import { IBookmarkGetAllPublicResponse } from './interfaces/IBookmarkGetAllPublicResponse';

export interface IBookmarkGetAllPublicUseCase {
  execute: (bookmarkGetAllPublicRequest: IBookmarkGetAllPublicRequest) => Promise<IBookmarkGetAllPublicResponse>;
}

export class BookmarkGetAllPublicUseCase implements IBookmarkGetAllPublicUseCase {
  private bookmarkRepo: IBookmarkRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(bookmarkRepo: IBookmarkRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.bookmarkRepo = bookmarkRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(bookmarkGetAllPublicRequest: IBookmarkGetAllPublicRequest): Promise<IBookmarkGetAllPublicResponse> {
    const { session, sort, size, after } = bookmarkGetAllPublicRequest;

    const bookmarks = await this.bookmarkRepo.bookmarkGetAllPublic({ sort, size, after });

    const filteredBookmarks = bookmarks.filter((bookmark) => !bookmark.isPrivate); // (1)

    const responseWithVotesPromises = filteredBookmarks.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.linkId, session });

      return {
        ...item,
        statistics,
      };
    });
    const responseWithVotes = await Promise.all(responseWithVotesPromises);

    return responseWithVotes;
  }
}
/* --- DOC ---
  Returns a collection of bookmark
  (1) Filter: when bookmark is not private
*/
