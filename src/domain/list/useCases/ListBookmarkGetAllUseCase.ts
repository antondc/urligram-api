import { ILinkGetStatisticsUseCase } from '@domain/link/useCases/LinkGetStatistics';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListBookmarkGetAllRequest } from './interfaces/IListBookmarkGetAllRequest';
import { IListBookmarkGetAllResponse } from './interfaces/IListBookmarkGetAllResponse';

export interface IListBookmarkGetAllUseCase {
  execute: (listBookmarkGetAllRequest: IListBookmarkGetAllRequest) => Promise<IListBookmarkGetAllResponse>;
}

export class ListBookmarkGetAllUseCase implements IListBookmarkGetAllUseCase {
  private listRepo: IListRepo;
  private linkGetStatisticsUseCase: ILinkGetStatisticsUseCase;

  constructor(listRepo: IListRepo, linkGetStatisticsUseCase: ILinkGetStatisticsUseCase) {
    this.listRepo = listRepo;
    this.linkGetStatisticsUseCase = linkGetStatisticsUseCase;
  }

  public async execute(listBookmarkGetAllRequest: IListBookmarkGetAllRequest): Promise<IListBookmarkGetAllResponse> {
    const { listId, session, sort, size, offset, filter } = listBookmarkGetAllRequest;

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const { bookmarks, meta } = await this.listRepo.listBookmarkGetAll({ listId, sessionId: session?.id, sort, size, offset, filter });
    const bookmarksWithVotesPromises = bookmarks.map(async (item) => {
      const statistics = await this.linkGetStatisticsUseCase.execute({ linkId: item.linkId, session });

      return {
        ...item,
        statistics,
      };
    });
    const bookmarksWithVotes = await Promise.all(bookmarksWithVotesPromises);

    const userInList = await this.listRepo.listUserGetOneByListId({ userId: session?.id, listId });

    if (!userInList && !!list.isPrivate) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    return {
      bookmarks: bookmarksWithVotes,
      meta,
    };
  }
}

/* --- DOC ---
  Returns a bookmark within a list
  Exceptions
    (1) The bookmark or the list are private, and the user is not in the list
*/
