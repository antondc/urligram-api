import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { IUserBookmarkGetAllRequest } from './interfaces/IUserBookmarkGetAllRequest';
import { IUserBookmarkGetAllResponse } from './interfaces/IUserBookmarkGetAllResponse';

export interface IUserBookmarkGetAllUseCase {
  execute: (userBookmarkGetAllRequest: IUserBookmarkGetAllRequest) => Promise<IUserBookmarkGetAllResponse>;
}

export class UserBookmarkGetAllUseCase implements IUserBookmarkGetAllUseCase {
  private userRepo: IUserRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(userRepo: IUserRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.userRepo = userRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(userBookmarkGetAllRequest: IUserBookmarkGetAllRequest): Promise<IUserBookmarkGetAllResponse> {
    const { userId, session, sort, size, offset, filter } = userBookmarkGetAllRequest;

    const { bookmarks, meta } = await this.userRepo.userBookmarkGetAll({
      userId,
      sessionId: session?.id,
      sort,
      size,
      offset,
      filter
    }); // (1)(2)

    const bookmarksWithVotesPromises = bookmarks.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.linkId, session });

      return {
        ...item,
        statistics,
      };
    });
    const bookmarksWithVotes = await Promise.all(bookmarksWithVotesPromises);

    return { bookmarks: bookmarksWithVotes, meta };
  }
}

/* --- DOC ---
  Returns a collection of bookmarks
  Returns when:
    (1) Bookmark is public
    (2) Bookmark is owned by user
  Exceptions:
*/
