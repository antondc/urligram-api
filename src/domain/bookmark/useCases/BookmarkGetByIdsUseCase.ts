import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IBookmarkGetByIdsRequest } from './interfaces/IBookmarkGetByIdsRequest';
import { IBookmarkGetByIdsResponse } from './interfaces/IBookmarkGetByIdsResponse';

export interface IBookmarkGetByIdsUseCase {
  execute: (bookmarkGetByIdsRequest: IBookmarkGetByIdsRequest) => Promise<IBookmarkGetByIdsResponse>;
}

export class BookmarkGetByIdsUseCase implements IBookmarkGetByIdsUseCase {
  private bookmarkRepo: IBookmarkRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(bookmarkRepo: IBookmarkRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.bookmarkRepo = bookmarkRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(bookmarkGetByIdsRequest: IBookmarkGetByIdsRequest): Promise<IBookmarkGetByIdsResponse> {
    const { session, ids } = bookmarkGetByIdsRequest;

    const bookmarksData = await this.bookmarkRepo.bookmarkGetByIds({ sessionId: session?.id, ids });

    const bookmarksWithVotesPromises = bookmarksData.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.linkId, session });

      return {
        ...item,
        statistics,
      };
    });
    const bookmarksWithVotes = await Promise.all(bookmarksWithVotesPromises);

    return bookmarksWithVotes;
  }
}
