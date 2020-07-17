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
    const { listId } = listBookmarkGetOneRequest;
    const { session, ...listBookmarkGetOneRequestWithoutSession } = listBookmarkGetOneRequest;

    const bookmark = await this.listRepo.listBookmarkGetOne({
      ...listBookmarkGetOneRequestWithoutSession,
    });
    const list = await this.listRepo.listGetOne({ listId });
    const isUserOwnerOfBookmark = bookmark.userId === session?.id;
    const isUserInList = list.users.filter((user) => user?.id === session?.id).length > 0;

    if (!list) throw new RequestError('List not found', 404, { message: '404 Not Found' }); // (1)
    if (!bookmark) throw new RequestError('Bookmark not found', 404, { message: '404 Not Found' }); // (2)
    if (!!list.isPrivate && !isUserInList) throw new RequestError('List not found', 404, { message: '404 Not Found' }); // (3)
    if (!!bookmark.isPrivate && !isUserOwnerOfBookmark) throw new RequestError('List not found', 404, { message: '404 Not Found' }); // (4)

    return bookmark;
  }
}

/* --- DOC ---
  Returns a bookmark within a list, except when
  (1) There is no list
  (2) There is no bookmark
  (3) List is private and user is not within it
  (4) Bookmark is private and user is not the owner
*/
