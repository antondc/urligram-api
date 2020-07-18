import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListBookmarkGetOneRequest } from './interfaces/IListBookmarkGetOneRequest';
import { IListBookmarkGetOneResponse } from './interfaces/IListBookmarkGetOneResponse';

export interface IListBookmarkGetOneUseCase {
  execute: (listBookmarkGetOneRequest: IListBookmarkGetOneRequest) => Promise<IListBookmarkGetOneResponse>;
}

export class ListBookmarkGetOneUseCase implements IListBookmarkGetOneUseCase {
  private listRepo: IListRepo;

  constructor(listRepo: IListRepo) {
    this.listRepo = listRepo;
  }

  public async execute(listBookmarkGetOneRequest: IListBookmarkGetOneRequest): Promise<IListBookmarkGetOneResponse> {
    const { listId, bookmarkId } = listBookmarkGetOneRequest;
    const { session } = listBookmarkGetOneRequest;

    const list = await this.listRepo.listGetOneById({ listId, userId: session?.id });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const listBookmark = await this.listRepo.listBookmarkGetOne({
      listId,
      bookmarkId,
      sessionId: session?.id,
    });
    if (!listBookmark) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    return listBookmark;
  }
}

/* --- DOC ---
  Returns a bookmark within a list, when (MySQL)
  (1) The bookmark and the list are public
  (2) The bookmark is private, but is in a list where the user is a member
  (3) The bookmark is private, but is owned by the user, and the user is a member of the list
*/
