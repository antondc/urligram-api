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

    const list = await this.listRepo.listGetOneById({ listId });
    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' });

    const bookmark = await this.listRepo.listBookmarkGetOne({
      listId,
      bookmarkId,
    });
    if (!bookmark) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    const userInList = await this.listRepo.listUserGetOneByListId({ userId: session?.id, listId });
    if (!userInList && (!!list.isPrivate || !!bookmark.isPrivate)) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' });

    return bookmark;
  }
}

/* --- DOC ---
  Returns a bookmark within a list, except when
  (1) The bookmark or the list are private, and the user is not in the list
*/
