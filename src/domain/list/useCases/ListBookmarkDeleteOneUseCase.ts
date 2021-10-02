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

    const list = await this.listRepo.listGetOneById({ listId, sessionId: session?.id });
    if (!list) throw new RequestError('List does not exist', 404, { message: '404 Not Found' }); // (1)

    const bookmark = await this.bookmarkRepo.bookmarkGetOne({ bookmarkId, sessionId: session?.id });
    if (!bookmark) throw new RequestError('Bookmark does not exist', 404, { message: '404 Not Found' }); // (2)

    const listBookmarks = await this.listRepo.listBookmarkGetAll({ listId, sessionId: session?.id, sort: null, size: null, offset: null });
    if (!listBookmarks?.bookmarks?.length) throw new RequestError('List does not have bookmarks', 404, { message: '404 Not Found' }); // (3)

    const bookmarksInListWithSameLinkId = listBookmarks?.bookmarks?.filter((item) => item?.linkId === bookmark?.linkId);

    const listUser = await this.listRepo.listUserGetOneByListId({ userId: session?.id, listId });
    if (!listUser || listUser?.userRole === 'reader') throw new RequestError('You can not edit this list', 403, { message: '403 Forbidden' }); // (4)

    const listBookmark = await this.listRepo.listBookmarkGetOne({ sessionId: session?.id, listId, bookmarkId });
    if (!listBookmark) throw new RequestError("List bookmark donesn't exists", 404, { message: '404 Not Found' }); // (5)

    // Remove all bookmarks with same link id form list
    await bookmarksInListWithSameLinkId.forEach(async (item) => {
      await this.listRepo.listBookmarkDeleteOne({ listId, bookmarkId: item?.id });
    });
    const deletedBookmarkFromList = await this.listRepo.listBookmarkDeleteOne({ listId, bookmarkId });

    return deletedBookmarkFromList;
  }
}
/* --- DOC ---
  Deletes a bookmark from a list
  Exceptions:
  (1) List doesn't exists
  (2) Bookmark doesn't exists
  (3) List doesnt have bookmarks
  (4) User is not in that list, or is in that list as a reader
  (5) The bookmark is already in that list
*/
