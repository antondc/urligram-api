import { IBookmarkRepo } from '@domain/bookmark/repositories/IBookmarkRepo';
import { IListRepo } from '@domain/list/repositories/IListRepo';
import { RequestError } from '@shared/errors/RequestError';
import { IListBookmarkDeleteOneRequest } from './interfaces/IListBookmarkDeleteOneRequest';
import { IListBookmarkDeleteOneResponse } from './interfaces/IListBookmarkDeleteOneResponse';

export interface IListBookmarkDeleteOneUseCase {
  execute: (listBookmarkDeleteOneRequest: IListBookmarkDeleteOneRequest) => Promise<IListBookmarkDeleteOneResponse>;
}

export class ListBookmarkDeleteOneUseCase implements IListBookmarkDeleteOneUseCase {
  private listRepo: IListRepo;
  private bookmarkRepo: IBookmarkRepo;

  constructor(listRepo: IListRepo, bookmarkRepo: IBookmarkRepo) {
    this.listRepo = listRepo;
    this.bookmarkRepo = bookmarkRepo;
  }

  public async execute(listBookmarkDeleteOneRequest: IListBookmarkDeleteOneRequest): Promise<IListBookmarkDeleteOneResponse> {
    const { session, listId, bookmarkId } = listBookmarkDeleteOneRequest;

    const list = await this.listRepo.listGetOneById({ listId });
    if (!list) throw new RequestError('List does not exist', 404, { message: '404 Not Found' }); // (1)

    const bookmark = await this.bookmarkRepo.bookmarkGetOne({ bookmarkId });
    if (!bookmark) throw new RequestError('Bookmark does not exist', 404, { message: '404 Not Found' }); // (2)

    const listUser = await this.listRepo.listUserGetOneByListId({ userId: session?.id, listId });
    if (!listUser || listUser?.userRole === 'reader') throw new RequestError('You can not edit this list', 403, { message: '403 Forbidden' }); // (3)

    const listBookmark = await this.listRepo.listBookmarkGetOne({ listId, bookmarkId });
    if (!listBookmark) throw new RequestError("List bookmark donesn't exists", 404, { message: '404 Not Found' }); // (4)

    const deletedBookmarkFromList = await this.listRepo.listBookmarkDeleteOne({ listId, bookmarkId });

    return deletedBookmarkFromList;
  }
}
/* --- DOC ---
  Deletes a bookmark from a list
  Exceptions:
  (1) List doesn't exists
  (2) Bookmark doesn't exists
  (3) User is not in that list, or is in that list as a reader
  (4) The bookmark is already in that list
*/
