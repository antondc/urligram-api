import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { USER_BASIC_BOOKMARKS_PRIVATE_FREE_LIMIT, USER_BASIC_BOOKMARKS_PRIVATE_RATIO_LIMIT } from '@shared/constants/constants';
import { RequestError } from '@shared/errors/RequestError';
import { UserError } from '@shared/errors/UserError';
import { UserAccountType } from '../entities/UserAccountType';
import { IUserBookmarkUpdateRequest } from './interfaces/IUserBookmarkUpdateRequest';
import { IUserBookmarkUpdateResponse } from './interfaces/IUserBookmarkUpdateResponse';

export interface IUserBookmarkUpdateUseCase {
  execute: (userBookmarkUpdateRequest: IUserBookmarkUpdateRequest) => Promise<IUserBookmarkUpdateResponse>;
}

export class UserBookmarkUpdateUseCase implements IUserBookmarkUpdateUseCase {
  private userRepo: IUserRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(userRepo: IUserRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.userRepo = userRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(userBookmarkUpdateRequest: IUserBookmarkUpdateRequest): Promise<IUserBookmarkUpdateResponse> {
    const { session, bookmarkId, order, title, isPublic, tags, notes } = userBookmarkUpdateRequest;

    const bookmarkExists = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      sessionId: session?.id,
      bookmarkId,
      userId: session?.id,
    });
    if (!bookmarkExists) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' }); // (1)

    const { bookmarks: userBookmarks } = await this.userRepo.userBookmarkGetAll({
      userId: session.id,
      sessionId: session?.id,
    });
    const userBookmarksPrivate = userBookmarks.filter((item) => !item.isPublic);
    const userBookmarksPrivateRatio = Math.floor((userBookmarksPrivate.length / userBookmarks.length) * 100);
    if (
      !isPublic &&
      session.accountType !== UserAccountType.Advanced &&
      userBookmarks.length > USER_BASIC_BOOKMARKS_PRIVATE_FREE_LIMIT &&
      userBookmarksPrivateRatio > USER_BASIC_BOOKMARKS_PRIVATE_RATIO_LIMIT
    ) {
      throw new UserError('User reached limit of private bookmarks', 403, '403 Forbidden');
    } // (2)

    const result = await this.userRepo.userBookmarkUpdate({
      bookmarkId,
      order,
      title,
      isPublic,
      tags,
      notes,
    });

    const bookmark = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      sessionId: session?.id,
      bookmarkId: result.bookmarkId,
      userId: session?.id,
    });

    const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: bookmark.linkId, session });

    const bookmarkWithStatistics = {
      ...bookmark,
      statistics,
    };

    return bookmarkWithStatistics;
  }
}

/* --- DOC ---
  Updates a Bookmark for given User
  Exceptions:
    (1) Bookmark does not exist
    (2) Bookmark is private,
        user is not an advanced user, and
        has more than USER_BASIC_BOOKMARKS_PRIVATE_FREE_LIMIT
        ratio private/public is more than USER_BASIC_BOOKMARKS_PRIVATE_RATIO_LIMIT
*/
