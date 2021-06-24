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
    const { session, sort, size, offset, filter } = bookmarkGetAllPublicRequest;

    const { bookmarks, meta } = await this.bookmarkRepo.bookmarkGetAllPublic({ sessionId: session?.id, sort, size, offset, filter });

    // If the user has bookmarked this bookmark, retrieve it and replace
    const bookmarksWithUserBookmarkPromises = bookmarks.map(async (item) => {
      const sessionUserPartialBookmark = item?.bookmarksRelated?.find((item) => item?.userId === session?.id);
      const sessionUserBookmarked = !!sessionUserPartialBookmark?.id;
      const sessionUserBookmarkTemporary =
        !!sessionUserBookmarked && (await this.bookmarkRepo.bookmarkGetOne({ bookmarkId: sessionUserPartialBookmark?.id, sessionId: session?.id }));
      const sessionUserBookmark = sessionUserBookmarked ? sessionUserBookmarkTemporary : item;

      return sessionUserBookmark;
    });
    const bookmarksWithUserBookmark = await Promise.all(bookmarksWithUserBookmarkPromises);

    const bookmarksWithVotesPromises = bookmarksWithUserBookmark.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.linkId, session });

      return {
        ...item,
        statistics,
      };
    });
    const bookmarksWithVotes = await Promise.all(bookmarksWithVotesPromises);

    return {
      bookmarks: bookmarksWithVotes,
      meta,
    };
  }
}
/* --- DOC ---
  Returns a collection of bookmark
  (1) Filter: when bookmark is not private
*/
