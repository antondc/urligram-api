import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
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
    const { session, bookmarkId, order, title, isPrivate, tags } = userBookmarkUpdateRequest;

    const bookmarkExists = await this.userRepo.userBookmarkGetOneByBookmarkIdUserId({
      sessionId: session?.id,
      bookmarkId,
      userId: session?.id,
    });
    if (!bookmarkExists) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const result = await this.userRepo.userBookmarkUpdate({
      bookmarkId,
      order,
      title,
      isPrivate,
      tags,
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
