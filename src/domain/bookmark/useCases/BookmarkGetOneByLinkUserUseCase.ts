import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { RequestError } from '@shared/errors/RequestError';
import { IBookmarkGetOneByLinkUserRequest } from './interfaces/IBookmarkGetOneByLinkUserRequest';
import { IBookmarkGetOneByLinkUserResponse } from './interfaces/IBookmarkGetOneByLinkUserResponse';

export interface IBookmarkGetOneByLinkUserUseCase {
  execute: (listBookmarkGetOneByLinkUserRequest: IBookmarkGetOneByLinkUserRequest) => Promise<IBookmarkGetOneByLinkUserResponse>;
}

export class BookmarkGetOneByLinkUserUseCase implements IBookmarkGetOneByLinkUserUseCase {
  private bookmarkRepo: IBookmarkRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(bookmarkRepo: IBookmarkRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.bookmarkRepo = bookmarkRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(listBookmarkGetOneByLinkUserRequest: IBookmarkGetOneByLinkUserRequest): Promise<IBookmarkGetOneByLinkUserResponse> {
    const { session, linkId } = listBookmarkGetOneByLinkUserRequest;
    const bookmark = await this.bookmarkRepo.bookmarkGetOneByLinkUser({ linkId, userId: session?.id });
    const bookmarkDefault = await this.bookmarkRepo.bookmarkGetDefaultByLink({ userId: session?.id, linkId });
    const bookmarkOrDefault = !!bookmark?.id ? bookmark : bookmarkDefault;
    if (!bookmarkOrDefault) throw new RequestError('Bookmark not found', 404, { message: '404 Not found' });

    if (bookmarkOrDefault.isPrivate && session?.id !== bookmarkOrDefault.userId)
      throw new RequestError('You have no permission to retrieve this bookmarkOrDefault', 403, { message: '403 Forbidden' });

    const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: bookmarkOrDefault.linkId, session });

    const bookmarkOrDefaultWithStatistics = {
      ...bookmarkOrDefault,
      statistics,
    };

    return bookmarkOrDefaultWithStatistics;
  }
}

/* --- DOC ---
  Returns a bookmark within a list
  Exceptions:
    (1) The bookmark or the list are private, and the user is not in the list
    (1) The bookmark doesnt exist
*/
