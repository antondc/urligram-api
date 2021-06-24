import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IUserRepo } from '@domain/user/repositories/IUserRepo';
import { RequestError } from '@shared/errors/RequestError';
import { URLWrapper } from '@shared/services/UrlWrapper';
import { IUserBookmarkGetByUrlRequest } from './interfaces/IUserBookmarkGetByUrlRequest';
import { IUserBookmarkGetByUrlResponse } from './interfaces/IUserBookmarkGetByUrlResponse';

export interface IUserBookmarkGetByUrlUseCase {
  execute: (userBookmarkGetByUrl: IUserBookmarkGetByUrlRequest) => Promise<IUserBookmarkGetByUrlResponse>;
}

export class UserBookmarkGetByUrlUseCase implements IUserBookmarkGetByUrlUseCase {
  private userRepo: IUserRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(userRepo: IUserRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.userRepo = userRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(userBookmarkGetByUrlRequest: IUserBookmarkGetByUrlRequest): Promise<IUserBookmarkGetByUrlResponse> {
    const { url, session } = userBookmarkGetByUrlRequest;

    const parsedUrl = new URLWrapper(url);
    const domain = parsedUrl.getOrigin();
    const path = parsedUrl.getPathAndSearch();

    const bookmark = await this.userRepo.userBookmarkGetOneByUserIdPathDomain({
      sessionId: session?.id,
      path,
      domain,
      userId: session?.id,
    });
    if (!bookmark?.id) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: bookmark.linkId, session });

    const bookmarkWithStatistics = {
      ...bookmark,
      statistics,
    };

    return bookmarkWithStatistics;
  }
}
